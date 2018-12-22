export const createVisitor = parser => {
  const BaseCstVisitor = parser.getBaseCstVisitorConstructor()
  class Visitor extends BaseCstVisitor {
    constructor () {
      super()
      this.validateVisitor()
    }
    flowchart (ctx) {
      return {
        direction: this.visit(ctx.direction),
        expressions: ctx.expression.map(expression => this.visit(expression))
      }
    }
    direction (ctx) {
      return ctx.orientation[0].image
    }
    expression (ctx) {
      const result = {
        node1: this.visit(ctx.node1[0])
      }
      if (ctx.edge) {
        result.edge = ctx.edge[0].image
        result.node2 = this.visit(ctx.node2[0])
      }
      return result
    }
    node (ctx) {
      const result = {
        id: ctx.nodeId[0].image
      }
      if (ctx.nodeData) {
        const data = ctx.nodeData[0].image
        if (data.startsWith('[') && data.endsWith(']')) {
          result.label = data.substring(1, data.length - 1)
          result.shape = 'rect'
        } else if (data.startsWith('((') && data.endsWith('))')) {
          result.label = data.substring(2, data.length - 2)
          result.shape = 'circle'
        } else if (data.startsWith('(') && data.endsWith(')')) {
          result.label = data.substring(1, data.length - 1)
          result.shape = 'rect'
          result.rx = 5
          result.ry = 5
        } else if (data.startsWith('{') && data.endsWith('}')) {
          try {
            const json = JSON.parse(data)
            Object.keys(json).forEach(k => { result[k] = json[k] })
          } catch (e) { // not valid json data
            result.label = data.substring(1, data.length - 1)
            result.shape = 'diamond'
          }
        }
      }
      return result
    }
  }
  return new Visitor()
}
