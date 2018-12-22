import dagreD3 from 'dagre-d3-renderer'
import * as d3 from 'd3'

import '../src/themes/forest.css'
import { toDagreGraph } from '../src'

// turn <pre> to <svg>
const renderElement = () => {
  d3.select('.flowchart').each(function () {
    const dagreGraph = toDagreGraph(this.innerText)

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('width', 512)
    svg.setAttribute('height', 384)
    svg.innerHTML = '<g></g>'
    this.parentNode.replaceChild(svg, this)

    const Render = dagreD3.render
    const render = new Render()
    render(d3.select(svg).select('g'), dagreGraph)
  })
}

renderElement()
