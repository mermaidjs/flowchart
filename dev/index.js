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
      edges.push([nodes[expression.node1.id], nodes[expression.node2.id]])
    }
  }
  Object.keys(nodes).forEach(id => {
    console.log(nodes[id].text || id, { shape: nodes[id].shape || 'rect' })
    graph.setNode(nodes[id].text || id, { shape: nodes[id].shape || 'rect' })
  })
  edges.forEach(([node1, node2]) => {
    console.log((node1.text || node1.id), (node2.text || node2.id))
    graph.setEdge((node1.text || node1.id), (node2.text || node2.id))
  })

  const g = d3.select(el).select('g')
  const Render = dagreD3.render
  const render = new Render()
  render(g, graph)
}

render(`
graph BT
A[hello] --> B
A --> C((world))
B --> D
C --> D
`, document.getElementById('container'))
