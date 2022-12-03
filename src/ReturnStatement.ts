import AstNode from "./AstNode.js";
import AstVisitor from "./AstVisitor";
import Expression from "./Expression";

export default class ReturnStatement extends AstNode {
  expressions: Expression[];
  constructor(expressions: Expression[]) {
    super();
    this.expressions = expressions;
  }
  accept(v: AstVisitor): void {
    v.visitReturnStatement(this);
    this.expressions.forEach((expr) => expr.accept(v));
  }
}
