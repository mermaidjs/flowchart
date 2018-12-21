import dagreD3 from 'dagre-d3-renderer'
import graphlib from 'graphlibrary'
import * as d3 from 'd3'
import * as R from 'ramda'

import '../src/themes/forest.css'

import { parse } from '../src/ast'

const generareGraph = input => {
  const ast = parse(input)

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

// turn <pre> to <svg>
const renderElement = () => {
  const flowchart = document.getElementById('flowchart')
  const g = d3.select('body').insert('svg', '#flowchart').attr('id', 'diagram').attr('width', 512).attr('height', 384).insert('g')
  const graph = generareGraph(flowchart.innerText)
  const Render = dagreD3.render
  const render = new Render()
  render(g, graph)
  flowchart.parentNode.removeChild(flowchart)
}

renderElement()
