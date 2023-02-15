export function isLetter(char: string) {
	let code = char.charCodeAt(0)
	return (
		(code >= 64 && code <= 90) || (code >= 97 && code <= 122) || char === "_"
	)
}

export const isNum = (char: string) => !isNaN(parseFloat(char))
