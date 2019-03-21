import { createToken, Lexer } from 'chevrotain'

// example: graph TD
export const graph = createToken({ name: 'graph', pattern: /graph/ })
export const orientation = createToken({ name: 'orientation', pattern: /(?:TB|TD|BT|LR|RL)/ })

// example: A[Hello]
export const nodeId = createToken({ name: 'nodeId', pattern: /[\w-]+/ })
export const nodeData = createToken({ name: 'nodeData', pattern: /(?:\[.+\]|\(\(.+\)\)|\(.+\)|\{.+\})/ })

// example: -->
export const edgeArrow = createToken({ name: 'edgeArrow', pattern: /(?:[-_.=]{2,}(?:>>|>)?)/ })
export const edgeData = createToken({ name: 'edgeData', pattern: /(?:\|.+\|)/ })

// all white space characters except line breaks
const whiteSpace = createToken({ name: 'whiteSpace', pattern: /[^\S\n\r]+/, group: Lexer.SKIPPED })
// line breaks
export const lineBreak = createToken({ name: 'lineBreak', pattern: /[\r\n]+/ })

// all tokens
export default [whiteSpace, lineBreak, edgeArrow, edgeData, nodeData, graph, orientation, nodeId]
