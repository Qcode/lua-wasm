import AstVisitor from "./AstVisitor.js";
import Expression from "./Expression.js";

export default class NumberNode extends Expression {
  theNumber: number;

  constructor(theNumber: string) {
    super();
    this.theNumber = Number(theNumber);
  }

  accept(v: AstVisitor) {
    v.visitNumberNode(this);
  }
}
