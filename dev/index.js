import dagreD3 from 'dagre-d3-renderer'
import * as d3 from 'd3'

import '../src/themes/forest.css'
import { toDagreGraph } from '../src'

// turn <pre> to <svg>
const renderElement = () => {
  const flowchart = document.getElementById('flowchart')
  const g = d3.select('body').insert('svg', '#flowchart').attr('id', 'diagram').attr('width', 512).attr('height', 384).insert('g')
  const dagreGraph = toDagreGraph(flowchart.innerText)
  const Render = dagreD3.render
  const render = new Render()
  render(g, dagreGraph)
  flowchart.parentNode.removeChild(flowchart)
}

renderElement()
