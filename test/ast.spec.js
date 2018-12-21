/* eslint-env jest */
import { parse } from '../src/ast'

describe('AST', () => {
  test('Single node', () => {
    const ast = parse(`graph TD
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
    const ast = parse(`graph LR
A --> B`)
    expect(ast).toEqual({
      direction: 'LR',
      expressions: [
        {
          node1: {
            id: 'A'
          },
          edge: '-->',
          node2: {
            id: 'B'
          }
        }
      ]
    })
  })

  test('iii --- jjj', () => {
    const ast = parse(`graph LR
iii --- jjj`)
    expect(ast).toEqual({
      direction: 'LR',
      expressions: [
        {
          node1: {
            id: 'iii'
          },
          edge: '---',
          node2: {
            id: 'jjj'
          }
        }
      ]
    })
  })

  test('A[hello world]', () => {
    const ast = parse(`graph TD
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
    const ast = parse(`graph TD
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
    const ast = parse(`graph TD
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
    const ast = parse(`graph TD
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
    const ast = parse(`graph TD
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
})
