import AstVisitor from "../AstVisitor.js";
import Expression from "./Expression.js";

export default class BooleanNode extends Expression {
  val: boolean;
  constructor(val: boolean) {
    super();
    this.val = val;
  }
  accept(v: AstVisitor): void {
    v.visitBooleanNode(this);
  }
}
