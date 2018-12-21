import dagreD3 from 'dagre-d3-renderer'
import graphlib from 'graphlibrary'
import * as d3 from 'd3'

import '../src/themes/forest.css'

import { parse } from '../src/ast'

const render = (input, el) => {
  const ast = parse(input)
  const graph = new graphlib.Graph({
    multigraph: true,
    compound: true
  }).setGraph({
    rankdir: ast.direction,
    marginx: 16,
    marginy: 16
  }).setDefaultEdgeLabel(function () { return {} })

  graph.setNode('This is the text in the box', { shape: 'rect' })
  graph.setNode('B', { shape: 'ellipse' })
  graph.setNode('C', { shape: 'diamond' })
  graph.setNode('D', { shape: 'circle' })

  graph.setEdge('This is the text in the box', 'B')
  graph.setEdge('This is the text in the box', 'C')
  graph.setEdge('B', 'D', { arrowhead: 'undirected' })
  graph.setEdge('C', 'D', { arrowhead: 'vee' })

  const g = d3.select('#container').select('g')

  // Create the renderer
  const Render = dagreD3.render
  const render = new Render()

  // Run the renderer. This is what draws the final graph.
  render(g, graph)
}

render(`graph TD
A --> B`, document.getElementById('container'))
