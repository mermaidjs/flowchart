/* eslint-env jest */
import process from '../src/ast'

describe('AST', () => {
  test('A --> B', () => {
    const ast = process(`graph LR
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
  test('Single node', () => {
    const ast = process(`graph TD
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
})
