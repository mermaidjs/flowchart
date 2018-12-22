import dagreD3 from 'dagre-d3-renderer'
import * as d3 from 'd3'

import '../src/themes/forest.css'
import { toDagreGraph } from '../src'

// turn <pre> to <svg>
const renderElement = () => {
  document.querySelectorAll('.flowchart').forEach(element => {
    // replace element with <svg width=512 height=384></svg>
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('width', 512)
    svg.setAttribute('height', 384)
    element.parentNode.replaceChild(svg, element)

    // render graph to <svg>
    const Render = dagreD3.render
    const render = new Render()
    const dagreGraph = toDagreGraph(element.innerText)
    render(d3.select(svg), dagreGraph)
  })
}

renderElement()
