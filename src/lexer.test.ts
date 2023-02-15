import { Token } from "typescript"
import { Lexer } from "./lexer"
import { TokenStructureType, Tokens } from "./token"

describe("Lexer", () => {
	describe("nextToken()", () => {
		it("should tokenize identifiers", () => {
			const input = "let x = 5;"
			const lexer = new Lexer(input)

			const expected = [
				{ TYPE: Tokens.LET, VALUE: "let" },
				{ TYPE: Tokens.IDENT, VALUE: "x" },
				{ TYPE: Tokens.ASSIGN, VALUE: "=" },
				{ TYPE: Tokens.INT, VALUE: "5" },
				{ TYPE: Tokens.SEMICOLON, VALUE: ";" },
				{ TYPE: Tokens.EOF, VALUE: "EOF" }
			]

			const tokens: TokenStructureType[] = []
			while (lexer.char) {
				tokens.push(lexer.nextToken())
				if (lexer.char === "__END_OF_FILE__") {
					tokens.push(lexer.nextToken())
					break
				}
			}
			expect(tokens).toEqual(expected)
		})
		it("should tokenize operators", () => {
			const input = "+-/*<>=!/%"
			const lexer = new Lexer(input)
			let tokens: TokenStructureType[] = []
			const expected = [
				{ TYPE: Tokens.PLUS, VALUE: "+" },
				{ TYPE: Tokens.MINUS, VALUE: "-" },
				{ TYPE: Tokens.SLASH, VALUE: "/" },
				{ TYPE: Tokens.ASTERIKS, VALUE: "*" },
				{ TYPE: Tokens.LESS_THAN, VALUE: "<" },
				{ TYPE: Tokens.GREATER_THAN, VALUE: ">" },
				{ TYPE: Tokens.ASSIGN, VALUE: "=" },
				{ TYPE: Tokens.BANG, VALUE: "!" },
				{ TYPE: Tokens.SLASH, VALUE: "/" },
				{ TYPE: Tokens.MODULO, VALUE: "%" },
				{ TYPE: Tokens.EOF, VALUE: "EOF" }
			]
			while (lexer.char) {
				tokens.push(lexer.nextToken())
				if (lexer.char === "__END_OF_FILE__") {
					tokens.push(lexer.nextToken())
					break
				}
			}

			expect(tokens).toEqual(expected)
		})
	})

	it("should tokenize NOT EQUAL !=", () => {
		const input = "!="
		const lexer = new Lexer(input)
		let tokens: TokenStructureType[] = []
		const expected = [
			{ TYPE: Tokens.NOT_EQUAL, VALUE: "!=" },
			{ TYPE: Tokens.EOF, VALUE: "EOF" }
		]
		while (lexer.char) {
			tokens.push(lexer.nextToken())
			if (lexer.char === "__END_OF_FILE__") {
				tokens.push(lexer.nextToken())
				break
			}
		}

		expect(tokens).toEqual(expected)
	})

	it("should tokenize  EQUAL ==", () => {
		const input = "=="
		const lexer = new Lexer(input)
		let tokens: TokenStructureType[] = []
		const expected = [
			{ TYPE: Tokens.EQUAL, VALUE: "==" },
			{ TYPE: Tokens.EOF, VALUE: "EOF" }
		]
		while (lexer.char) {
			tokens.push(lexer.nextToken())
			if (lexer.char === "__END_OF_FILE__") {
				tokens.push(lexer.nextToken())
				break
			}
		}

		expect(tokens).toEqual(expected)
	})
	it("should tokenize  Number", () => {
		const input = "let a = 12234"
		const lexer = new Lexer(input)
		let tokens: TokenStructureType[] = []
		const expected = [
			{ TYPE: Tokens.LET, VALUE: "let" },
			{ TYPE: Tokens.IDENT, VALUE: "a" },
			{ TYPE: Tokens.ASSIGN, VALUE: "=" },
			{ TYPE: Tokens.INT, VALUE: "12234" },
			{ TYPE: Tokens.EOF, VALUE: "EOF" }
		]
		while (lexer.char) {
			tokens.push(lexer.nextToken())
			if (lexer.char === "__END_OF_FILE__") {
				tokens.push(lexer.nextToken())
				break
			}
		}

		expect(tokens).toEqual(expected)
	})

	it("should tokenize 1 == 1", () => {
		const input = "1 == 1"
		const lexer = new Lexer(input)
		let tokens: TokenStructureType[] = []
		const expected = [
			{ TYPE: Tokens.INT, VALUE: "1" },
			{ TYPE: Tokens.EQUAL, VALUE: "==" },
			{ TYPE: Tokens.INT, VALUE: "1" },
			{ TYPE: Tokens.EOF, VALUE: "EOF" }
		]
		while (lexer.char) {
			tokens.push(lexer.nextToken())
			if (lexer.char === "__END_OF_FILE__") {
				tokens.push(lexer.nextToken())
				break
			}
		}

		expect(tokens).toEqual(expected)
	})
	describe("readChar", () => {
		it("should read the next character", () => {
			let input = "let x = 5;"
			const lexer = new Lexer(input)

			expect(lexer.char).toBe("l")
			lexer.readChar()
			expect(lexer.char).toBe("e")
			lexer.readChar()
			expect(lexer.char).toBe("t")
		})
		it("should set the clear property to __END_OF_FILE__ if there are no more char to read", () => {
			let input = "x"
			const lexer = new Lexer(input)

			expect(lexer.char).toBe("x")
			lexer.readChar()
			expect(lexer.char).toBe("__END_OF_FILE__")
		})
	})

	describe("skipWhiteSpaces", () => {
		it("should trim spaces", () => {
			let input = `


      x
      `
			let lexer = new Lexer(input)
			console.log(lexer)
			expect(lexer.position).toBe(0)
			expect(lexer.readPosition).toBe(1)
			expect(lexer.char).toBe("\n")
			lexer.skipWhiteSpaces()
			expect(lexer.position).toBeGreaterThan(0)
			expect(lexer.readPosition).toBeGreaterThan(lexer.position)
			expect(lexer.char).toBe("x")
		})
	})
	describe("readIdentifier", () => {
		it("should read identifiers", () => {
			let input = `let num = 5`
			let lexer = new Lexer(input)
			let res = lexer.readIdentifier()
			expect(res).toBe("let")
			lexer.skipWhiteSpaces()
			expect(lexer.char).toBe("n")
			res = lexer.readIdentifier()
			expect(res).toBe("num")
		})
	})
	describe("readNumber", () => {
		it("should read Numbers", () => {
			let input = `54564`
			let lexer = new Lexer(input)
			let res = lexer.readNumber()
			expect(res).toBe("54564")
		})
	})
	describe("peekChar", () => {
		it("should give back next character", () => {
			let input = `!=`
			let lexer = new Lexer(input)
			expect(lexer.char).toBe("!")
			let peak = lexer.peakChar()
			expect(peak).toBe("=")
		})
	})
})
