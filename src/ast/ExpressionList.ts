import AstVisitor from "../AstVisitor";
import AstNode from "./AstNode.js";
import Expression from "./Expression";

export default class ExpressionList extends AstNode {
  expressions: Expression[];
  constructor(expressions: Expression[]) {
    super();
    this.expressions = expressions;
  }
  accept(v: AstVisitor): void {
    v.visitExpressionList(this);
    this.expressions.forEach((expr) => expr.accept(v));
    v.leaveExpressionList(this);
  }
}
