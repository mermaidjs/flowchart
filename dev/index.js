import dagreD3 from 'dagre-d3-renderer'
import graphlib from 'graphlibrary'
import * as d3 from 'd3'
import * as R from 'ramda'

import '../src/themes/forest.css'

import { parse } from '../src/ast'

const render = (input, el) => {
  const ast = parse(input)
  console.log(JSON.stringify(ast, null, 2))

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
    graph.setNode(id, { label: nodes[id].label || id, shape: nodes[id].shape || 'rect' })
  })
  edges.forEach(([node1, node2]) => {
    graph.setEdge(node1, node2)
  })

  const g = d3.select(el).select('g')
  const Render = dagreD3.render
  const render = new Render()
  render(g, graph)
}

render(`
graph TD
A[hello] --> B
A --> C((world))
B --> D
C --> D
`, document.getElementById('container'))
