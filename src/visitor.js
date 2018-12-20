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
        result.data = ctx.nodeData[0].image
      }
      return result
    }
  }
  return new Visitor()
}
