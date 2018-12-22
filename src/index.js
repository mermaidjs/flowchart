import graphlib from 'graphlibrary'
import * as R from 'ramda'

import { toAst } from './ast'

export const toDagreGraph = input => {
  const ast = toAst(input)

  const graph = new graphlib.Graph({
    multigraph: true,
    compound: true
  }).setGraph({
    rankdir: ast.direction,
    marginx: 16,
    marginy: 16
  }).setDefaultEdgeLabel(function () { return {} })

  const nodes = {}
  const edges = []
  for (const expression of ast.expressions) {
    nodes[expression.node1.id] = R.merge((nodes[expression.node1.id] || {}), expression.node1)
    if (expression.node2) {
      nodes[expression.node2.id] = R.merge((nodes[expression.node2.id] || {}), expression.node2)
      edges.push([expression.node1.id, expression.node2.id])
    }
  }
  Object.keys(nodes).forEach(id => {
    graph.setNode(id, nodes[id])
  })
  edges.forEach(([node1, node2]) => {
    graph.setEdge(node1, node2)
  })

  return graph
}
