export function addHighlight(text: string): string {
	const index = findHighlight(text);
	if (index == -1) {
		return text;
	}
	const before = text.substring(0, index);
	const after = text.substring(index, text.length);
	return `<strong>${before}</strong>${after}`;
}

function findHighlight(text: string): number {
	const bracket = text.indexOf('（');
	let particle = text.indexOf('は、');
	if (particle > -1) {
		while (/\s/.test(text[particle - 1]) && particle > 1) {
			particle -= 1;
		}
	}
	if (bracket != -1 && particle != -1) {
		return Math.min(bracket, particle);
	} else {
		return Math.max(bracket, particle);
	}
}
