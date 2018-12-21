import { Parser as BaseParser } from 'chevrotain'

import tokens from './tokens'
import { createVisitor } from './visitor'

// have to require instead of import because: https://github.com/SAP/chevrotain/issues/345#issuecomment-272934994
const { lineBreak, graph, orientation, edge, nodeId, nodeData } = require('./tokens')

class Parser extends BaseParser {
  constructor () {
    super(tokens)
    const $ = this
    $.RULE('flowchart', () => {
      $.SUBRULE($.direction)
      $.CONSUME(lineBreak)
      $.AT_LEAST_ONE_SEP({
        SEP: lineBreak,
        DEF: () => $.SUBRULE($.expression)
      })
    })
    $.RULE('direction', () => {
      $.CONSUME(graph)
      $.CONSUME(orientation)
    })
    $.RULE('expression', () => {
      $.SUBRULE1($.node, { LABEL: 'node1' })
      $.OPTION(() => {
        $.CONSUME(edge)
        $.SUBRULE2($.node, { LABEL: 'node2' })
      })
    })
    $.RULE('node', () => {
      $.CONSUME(nodeId)
      $.OPTION(() => $.CONSUME(nodeData))
    })
    this.performSelfAnalysis()
    this.visitor = createVisitor(this)
  }
}

export default new Parser()
