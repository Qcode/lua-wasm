import AstVisitor from "../AstVisitor";
import Expression from "./Expression";

export default class FieldAccess extends Expression {
  // Evaluate theTable to get a table on the stack
  theTable: Expression;
  key: Expression;

  constructor(theTable: Expression, key: Expression) {
    super();
    this.theTable = theTable;
    this.key = key;
  }

  accept(v: AstVisitor): void {
    v.visitFieldAccess(this);
    this.theTable.accept(v);
    this.key.accept(v);
    v.leaveFieldAccess(this);
  }
}
