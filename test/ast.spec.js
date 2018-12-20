/* eslint-env jest */
import process from '../src/ast'

describe('AST', () => {
  test('A --> B', () => {
    const ast = process(`graphLR
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
})
