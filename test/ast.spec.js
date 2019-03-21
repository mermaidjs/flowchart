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
          edge: { markerEnd: 'normal' },
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
          edge: { markerEnd: 'undirected' },
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
          edge: { markerEnd: 'normal' },
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
          edge: { markerEnd: 'vee' },
          node2: {
            id: 'jjj'
          }
        }
      ]
    })
  })
})
