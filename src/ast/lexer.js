import { Lexer } from 'chevrotain'

import tokens from './tokens'

const lexer = new Lexer(tokens)

export default lexer
