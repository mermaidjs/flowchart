import graphlib from 'graphlibrary'
import * as R from 'ramda'
import dagreD3 from 'dagre-d3-renderer'
import * as d3 from 'd3'

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

export const renderElements = selectors => {
  document.querySelectorAll(selectors).forEach(element => {
    let dagreGraph
    try {
      dagreGraph = toDagreGraph(element.innerText)
    } catch (e) {
      element.innerText = `${e.name}
${e.message}
Line: ${e.token.startLine} Column: ${e.token.startColumn}
`
      return
    }

    // replace element with <svg>
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    element.parentNode.replaceChild(svg, element)

    // render graph to <svg>
    const Render = dagreD3.render
    const render = new Render()
    render(d3.select(svg), dagreGraph)
    svg.setAttribute('width', dagreGraph.graph().width)
    svg.setAttribute('height', dagreGraph.graph().height)
  })
}
