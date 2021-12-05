import json


PREFECTURES = (
    '北海道',
    '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県',
    '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県',
    '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
    '鳥取県', '島根県', '岡山県', '広島県', '山口県',
    '徳島県', '香川県', '愛媛県', '高知県',
    '福岡県','佐賀県', '長崎県',  '熊本県', '大分県', '宮崎県', '鹿児島県',
    '沖縄県'
)

# 政令指定都市
DESIGNATED_CITIES = (
    '札幌市',
    '仙台市',
    'さいたま市',
    '千葉市',
    '横浜市',
    '川崎市',
    '相模原市',
    '新潟市',
    '静岡市',
    '浜松市',
    '名古屋市',
    '京都市',
    '大阪市',
    '堺市',
    '神戸市',
    '岡山市',
    '広島市',
    '北九州市',
    '福岡市',
    '熊本市'
)


with open("../data/pref_munic_coords.json") as fp:
    pref_munic_coords = json.load(fp)

def identify_locations(text):
    """Wikipediaの出身地記述を、市区町村名へ名寄せ"""
    if text.startswith("http://ja.dbpedia.org/resource/"):
        text = text.replace("http://ja.dbpedia.org/resource/", "")
    for c in (" ", "・", "、", ", ", ",", "·"):
        text = text.replace(c, "")
    if not text:
        return None

    # テキストが都道府県名から始まっていることを想定
    target_pref = None
    for p in pref_munic_coords.keys():
        if text.startswith(p):
            target_pref = p
            break
    if not target_pref:
        return None

    rest = text[len(target_pref):]
    if not rest:
        return None
    # 政令指定都市のときは”区”レベルまでを想定
    if rest in DESIGNATED_CITIES:
        return None

    if rest in pref_munic_coords[target_pref]:
        return (target_pref, rest)

    # 対象都道府県下の市区町村（文字列の長い順）から始まるかチェック
    candidate_munics = sorted(pref_munic_coords[target_pref].keys(), key=lambda x: len(x), reverse=True)
    for munic in candidate_munics:
        if rest.startswith(munic):
            return (target_pref, munic)


    for alias_expr in ("（現在の同県", "（現在の", "（現在：", "（現：", "（現:", "（現"):
        if alias_expr in text:
            start = text.index(alias_expr) + len(alias_expr)
            end = text.find("）")
            rest = text[start:end]
            rest = rest.replace(target_pref, "") # "A県Ｂ市（現：A県Ｃ市）"のケース
            if rest in DESIGNATED_CITIES:
                return None
            for munic in candidate_munics:
                if rest.startswith(munic):
                    return (target_pref, munic)
                # "Ａ県B郡C町（現：Ｄ町）"のように間が抜けるケース
                elif munic.endswith(rest):
                    return (target_pref, munic)
    
    return None


assert identify_locations("北海道") == None
assert identify_locations("北海道札幌市") == None
assert identify_locations("北海道札幌市中央区") == ("北海道", "札幌市中央区")
assert identify_locations("・北海道札幌市中央区") == ("北海道", "札幌市中央区")
assert identify_locations("http://ja.dbpedia.org/resource/北海道札幌市中央区") == ("北海道", "札幌市中央区")
assert identify_locations("北海道札幌市中央区北1条") == ("北海道", "札幌市中央区")
assert identify_locations("北海道札幌市中央区生まれ") == ("北海道", "札幌市中央区")
assert identify_locations("北海道札幌市中央区北1条東4丁目1-1サッポロファクトリー1条館3F") == ("北海道", "札幌市中央区")
assert identify_locations("岩手県水沢市（現：奥州市）") == ("岩手県", "奥州市")
assert identify_locations("徳島県海部郡宍喰町（現：海陽町）") == ("徳島県", "海部郡海陽町")
assert identify_locations("山梨県北巨摩郡小淵沢町（現：山梨県北杜市）") == ("山梨県", "北杜市")
assert identify_locations("高知県高岡郡高岡町（現在の同県土佐市）") == ("高知県", "土佐市")
