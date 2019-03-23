/* eslint-env jest */
import { toAst } from '../src/ast'

describe('AST', () => {
  test('Single node', () => {
    const ast = toAst(`graph TD
A`)
    expect(ast).toEqual({
      direction: 'TD',
      expressions: [
        {
          node1: {
            id: 'A'
          }
        }
      ]
    })
  })

  test('A --> B', () => {
    const ast = toAst(`graph LR
A --> B`)
    expect(ast).toEqual({
      direction: 'LR',
      expressions: [
        {
          node1: {
            id: 'A'
          },
          edge: { markerEnd: 'normal', styleClasses: [] },
          node2: {
            id: 'B'
          }
        }
      ]
    })
  })

  test('iii --- jjj', () => {
    const ast = toAst(`graph LR
iii --- jjj`)
    expect(ast).toEqual({
      direction: 'LR',
      expressions: [
        {
          node1: {
            id: 'iii'
          },
          edge: { markerEnd: 'undirected', styleClasses: [] },
          node2: {
            id: 'jjj'
          }
        }
      ]
    })
  })

  test('A[hello world]', () => {
    const ast = toAst(`graph TD
A[hello world]`)
    expect(ast).toEqual({
      direction: 'TD',
      expressions: [
        {
          node1: {
            id: 'A',
            label: 'hello world',
            shape: 'rect'
          }
        }
      ]
    })
  })

  test('Round rectangle', () => {
    const ast = toAst(`graph TD
A(hello world)`)
    expect(ast).toEqual({
      direction: 'TD',
      expressions: [
        {
          node1: {
            id: 'A',
            label: 'hello world',
            shape: 'rect',
            rx: 5,
            ry: 5
          }
        }
      ]
    })
  })

  test('Circle', () => {
    const ast = toAst(`graph TD
A((hello world))`)
    expect(ast).toEqual({
      direction: 'TD',
      expressions: [
        {
          node1: {
            id: 'A',
            label: 'hello world',
            shape: 'circle'
          }
        }
      ]
    })
  })

  test('Diamond', () => {
    const ast = toAst(`graph TD
A{hello world}`)
    expect(ast).toEqual({
      direction: 'TD',
      expressions: [
        {
          node1: {
            id: 'A',
            label: 'hello world',
            shape: 'diamond'
          }
        }
      ]
    })
  })

  test('Special character in node data', () => {
    const ast = toAst(`graph TD
A[hello ] world]
B((hello)(world*汉字，㊙️“"))`)
    expect(ast).toEqual({
      direction: 'TD',
      expressions: [
        {
          node1: {
            id: 'A',
            label: 'hello ] world',
            shape: 'rect'
          }
        },
        {
          node1: {
            id: 'B',
            label: 'hello)(world*汉字，㊙️“"',
            shape: 'circle'
          }
        }
      ]
    })
  })

  test('json node data', () => {
    const ast = toAst(`graph LR
A --> B
A{"shape": "rect", "label": "Hello", "rx": 15, "ry": 5}
B{"shape": "circle", "label": "World"}
`)
    expect(ast).toEqual({
      direction: 'LR',
      expressions: [
        {
          edge: { markerEnd: 'normal', styleClasses: [] },
          node1: { id: 'A' },
          node2: { id: 'B' }
        },
        {
          node1: { id: 'A', label: 'Hello', rx: 15, ry: 5, shape: 'rect' }
        },
        {
          node1: { id: 'B', label: 'World', shape: 'circle' }
        }
      ]
    })
  })

  test('iii -->> jjj', () => {
    const ast = toAst(`graph LR
iii -->> jjj`)
    expect(ast).toEqual({
      direction: 'LR',
      expressions: [
        {
          node1: {
            id: 'iii'
          },
          edge: { markerEnd: 'vee', styleClasses: [] },
          node2: {
            id: 'jjj'
          }
        }
      ]
    })
  })

  test('ii_ -.- jj_', () => {
    const ast = toAst(`graph LR
ii_ -.- jj_`)
    expect(ast).toEqual({
      direction: 'LR',
      expressions: [
        {
          node1: {
            id: 'ii_'
          },
          edge: {
            markerEnd: 'undirected',
            styleClasses: ['dotted']
          },
          node2: {
            id: 'jj_'
          }
        }
      ]
    })
  })

  test('ii_ -_- jj_', () => {
    const ast = toAst(`graph LR
ii_ -_- jj_`)
    expect(ast).toEqual({
      direction: 'LR',
      expressions: [
        {
          node1: {
            id: 'ii_'
          },
          edge: {
            markerEnd: 'undirected',
            styleClasses: ['dashed']
          },
          node2: {
            id: 'jj_'
          }
        }
      ]
    })
  })

  test('ii_ === jj_', () => {
    const ast = toAst(`graph LR
ii_ === jj_`)
    expect(ast).toEqual({
      direction: 'LR',
      expressions: [
        {
          node1: {
            id: 'ii_'
          },
          edge: {
            markerEnd: 'undirected',
            styleClasses: ['heavy']
          },
          node2: {
            id: 'jj_'
          }
        }
      ]
    })
  })

  test('ii_ _.> jj_', () => {
    const ast = toAst(`graph LR
ii_ _.> jj_`)
    expect(ast).toEqual({
      direction: 'LR',
      expressions: [
        {
          node1: {
            id: 'ii_'
          },
          edge: {
            markerEnd: 'normal',
            styleClasses: ['dotted', 'dashed']
          },
          node2: {
            id: 'jj_'
          }
        }
      ]
    })
  })

  test('ii_ =.> jj_', () => {
    const ast = toAst(`graph LR
ii_ =.> jj_`)
    expect(ast).toEqual({
      direction: 'LR',
      expressions: [
        {
          node1: {
            id: 'ii_'
          },
          edge: {
            markerEnd: 'normal',
            styleClasses: ['dotted', 'heavy']
          },
          node2: {
            id: 'jj_'
          }
        }
      ]
    })
  })

  test('ii_ =_> jj_', () => {
    const ast = toAst(`graph LR
ii_ =_> jj_`)
    expect(ast).toEqual({
      direction: 'LR',
      expressions: [
        {
          node1: {
            id: 'ii_'
          },
          edge: {
            markerEnd: 'normal',
            styleClasses: ['dashed', 'heavy']
          },
          node2: {
            id: 'jj_'
          }
        }
      ]
    })
  })

  test('ii_ =_.>> jj_', () => {
    const ast = toAst(`graph LR
ii_ =_.>> jj_`)
    expect(ast).toEqual({
      direction: 'LR',
      expressions: [
        {
          node1: {
            id: 'ii_'
          },
          edge: {
            markerEnd: 'vee',
            styleClasses: ['dotted', 'dashed', 'heavy']
          },
          node2: {
            id: 'jj_'
          }
        }
      ]
    })
  })
})
