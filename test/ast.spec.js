/* eslint-env jest */
import parse from '../src/ast'

describe('AST', () => {
  test('Single node', () => {
    const ast = parse(`graph TD
A`)
    expect(ast).toEqual({
      'direction': 'TD',
      'expressions': [
        {
          'node1': {
            'id': 'A'
          }
        }
      ]
    })
  })

  test('A --> B', () => {
    const ast = parse(`graph LR
A --> B`)
    expect(ast).toEqual({
      'direction': 'LR',
      'expressions': [
        {
          'node1': {
            'id': 'A'
          },
          'edge': '-->',
          'node2': {
            'id': 'B'
          }
        }
      ]
    })
  })

  test('iii --- jjj', () => {
    const ast = parse(`graph LR
iii --- jjj`)
    expect(ast).toEqual({
      'direction': 'LR',
      'expressions': [
        {
          'node1': {
            'id': 'iii'
          },
          'edge': '---',
          'node2': {
            'id': 'jjj'
          }
        }
      ]
    })
  })

  test('A[hello world]', () => {
    const ast = parse(`graph TD
A[hello world]`)
    expect(ast).toEqual({
      'direction': 'TD',
      'expressions': [
        {
          'node1': {
            'id': 'A',
            'data': '[hello world]'
          }
        }
      ]
    })
  })
})
