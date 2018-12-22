import lexer from './lexer'
import parser from './parser'

export const toAst = input => {
  const lexed = lexer.tokenize(input.trim())
  parser.input = lexed.tokens
  const cst = parser.flowchart()
  if (parser.errors.length > 0) {
    throw parser.errors[0]
  }
  const ast = parser.visitor.visit(cst)
  return ast
}
