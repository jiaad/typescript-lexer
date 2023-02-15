import {
	TokenType,
	TokenStructureType,
	Tokens,
	token,
	lookupIdentifier
} from "./token"
import { isLetter, isNum } from "./utils"

type LexerType = {
	input: string
	position: number
	readPosition: number // position+1
	char: string
	nextToken(): TokenStructureType
	readChar(): void
	skipWhiteSpaces(): void
}

export class Lexer implements LexerType {
	position: number = 0
	readPosition: number = 1
	char: string = ""

	constructor(public input: string) {
		this.input = input
		this.readChar()
	}

	readChar() {
		if (this.readPosition >= this.input.length) {
			this.char = "__END_OF_FILE__"
		} else {
			this.char = this.input[this.readPosition]
		}
		this.position = this.readPosition
		this.readPosition += 1
	}

	skipWhiteSpaces() {
		while ([" ", "\n", "\t", "\r"].includes(this.char)) this.readChar()
	}

	readIdentifier() {
		let current = this.position
		while (isLetter(this.char)) {
			this.readChar()
		}
		return this.input.slice(current, this.position)
	}

	readNumber() {
		let position = this.position
		while (isNum(this.char)) this.readChar()

		return this.input.slice(position, this.position)
	}

	peekChar() {
		return this.input[this.readPosition]
	}

	nextToken(): TokenStructureType {
		let tok: TokenStructureType = { TYPE: "", VALUE: "" }
		this.skipWhiteSpaces()
		switch (this.char) {
			case Tokens.ASSIGN:
				if (this.peekChar() === "=") {
					let ch: string = this.char
					this.readChar()
					tok = token(Tokens.EQUAL, ch + this.char)
				} else {
					tok = token(Tokens.ASSIGN, this.char)
				}
				break
			case Tokens.BANG:
				if (this.peekChar() === "=") {
					let char = this.char
					this.readChar()
					tok = token(Tokens.NOT_EQUAL, char + this.char)
				} else {
					tok = token(Tokens.BANG, this.char)
				}
				break
			case Tokens.SLASH:
				tok = token(Tokens.SLASH, this.char)
				break
			case Tokens.ASTERIKS:
				tok = token(Tokens.ASTERIKS, this.char)
				break
			case Tokens.LESS_THAN:
				tok = token(Tokens.LESS_THAN, this.char)
				break
			case Tokens.GREATER_THAN:
				tok = token(Tokens.GREATER_THAN, this.char)
				break
			case Tokens.COMMA:
				tok = token(Tokens.COMMA, this.char)
				break
			case Tokens.SEMICOLON:
				tok = token(Tokens.SEMICOLON, this.char)
				break
			case Tokens.LBRACE:
				tok = token(Tokens.LBRACE, this.char)
				break
			case Tokens.RBRACE:
				tok = token(Tokens.RBRACE, this.char)
				break

			case Tokens.LPAREN:
				tok = token(Tokens.LPAREN, this.char)
				break

			case Tokens.RPAREN:
				tok = token(Tokens.RPAREN, this.char)
				break
			case Tokens.PLUS:
				tok = token(Tokens.PLUS, this.char)
				break
			case Tokens.MINUS:
				tok = token(Tokens.MINUS, this.char)
				break
			case Tokens.MODULO:
				tok = token(Tokens.MODULO, this.char)
				break
			case "__END_OF_FILE__":
				tok.TYPE = ""
				tok.VALUE = Tokens.EOF
				break
			default: {
				if (isLetter(this.char)) {
					let value = this.readIdentifier()
					let type = lookupIdentifier(value)
					tok = token(type, value)
					return tok
				} else if (isNum(this.char)) {
					let value = this.readNumber()
					tok = token(Tokens.INT, value)
					return tok
				} else {
					tok = token(Tokens.ILLEGAL, this.char)
				}
			}
		}
		this.readChar()
		return tok
	}
}
