import AstNode from "./AstNode.js";
import AstVisitor from "../AstVisitor";
import ExpressionList from "./ExpressionList.js";

export default class ReturnStatement extends AstNode {
  expressions: ExpressionList;
  constructor(expressions: ExpressionList) {
    super();
    this.expressions = expressions;
  }
  accept(v: AstVisitor): void {
    v.visitReturnStatement(this);
    this.expressions.accept(v);
    v.leaveReturnStatement(this);
  }
}
