import { Lexer } from "./lexer"
import { Tokens, token } from "./token"
function test() {
	let input = `           =+{}() 
  
  let jiad = 2345
  fn hey(){
    let tusher = 999
  }
  1 == 2
  3 != 4
  4 % 2
  4 / 2
  4 - 2

  let jiad= "jiad est la"

  `
	input = "let x = 5;"
	let lexer = new Lexer(input)
	while (true) {
		let a = lexer.nextToken()
		console.log(a)
		if (a.VALUE === Tokens.EOF) break
	}
}

test()
