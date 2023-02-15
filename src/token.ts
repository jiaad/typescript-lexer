export type TokenType = string

export type TokenStructureType = {
	TYPE: TokenType
	VALUE: string
}

//const Token: TokenType = {TYPE: "", VALUE: ""}
export function token(type: string, value: string) {
	return {
		TYPE: type,
		VALUE: value
	} as TokenStructureType
}

export const Tokens = {
	ILLEGAL: "ILLEGAL",
	EOF: "EOF",
	STRING: "STRING",

	// IDENTIFIERS + LITERALLS
	IDENT: "IDENT",
	INT: "INT",

	// OPERATORS
	ASSIGN: "=",
	EQUAL: "==",
	NOT_EQUAL: "==",
	PLUS: "+",
	MINUS: "-",
	ASTERIKS: "*",
	SLASH: "/",
	MODULO: "%",
	LESS_THAN: "<",
	GREATER_THAN: ">",

	// DELIMITERS
	COMMA: ",",
	SEMICOLON: ";",

	LPAREN: "(",
	RPAREN: ")",
	RBRACE: "}",
	LBRACE: "{",
	BANG: "!",
	// KEYWORDS
	FUNCTION: "FUNCTION",
	IF: "IF",
	ELSE: "ELSE",
	RETURN: "RETURN",
	TRUE: "TRUE",
	FALSE: "FALSE",
	LET: "LET"
}

// type KEYWORDSType = {
// 	fn: TokenType
// 	let: TokenType
// 	true: TokenType
// 	false: TokenType
// 	if: TokenType
// 	else: TokenType
// 	return: TokenType
// }
type KEYWORDSType = {
	[key: string]: TokenType
}
const KEYWORDS: KEYWORDSType = {
	fn: Tokens.FUNCTION,
	let: Tokens.LET,
	true: Tokens.TRUE,
	false: Tokens.FALSE,
	if: Tokens.IF,
	else: Tokens.ELSE,
	return: Tokens.RETURN
}

export function lookupIdentifier(value: TokenType) {
	if (KEYWORDS[value]) {
		return KEYWORDS[value]
	}
	// ekse Tokens.IDENT -> incase name of something like function
	return Tokens.IDENT
}
