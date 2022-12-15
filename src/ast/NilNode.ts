import AstVisitor from "../AstVisitor.js";
import Expression from "./Expression.js";

export default class NilNode extends Expression {
  constructor() {
    super();
  }
  accept(v: AstVisitor): void {
    v.visitNilNode(this);
  }
}
