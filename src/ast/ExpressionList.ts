import AstVisitor from "../AstVisitor";
import AstNode from "./AstNode.js";
import Expression from "./Expression";
import FuncCall from "./FuncCall.js";
import { CopyReturnValues } from "./FuncCall.js";

export default class ExpressionList extends AstNode {
  expressions: Expression[];
  constructor(expressions: Expression[]) {
    super();
    this.expressions = expressions;
    if (this.lastExprIsFunc()) {
      const finalVal = this.expressions[
        this.expressions.length - 1
      ] as FuncCall;
      finalVal.copyReturnValues = CopyReturnValues.Many;
    }
  }
  accept(v: AstVisitor): void {
    v.visitExpressionList(this);
    this.expressions.forEach((expr) => expr.accept(v));
    v.leaveExpressionList(this);
  }
  lastExprIsFunc(): boolean {
    return (
      this.expressions.length > 0 &&
      this.expressions[this.expressions.length - 1] instanceof FuncCall
    );
  }
}
