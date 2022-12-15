import AstVisitor from "../AstVisitor.js";
import Expression from "./Expression.js";

export default class FieldAccess extends Expression {
  // Evaluate theTable to get a table on the stack
  theTable: Expression;
  // Evaluate key to get the key
  key: Expression;

  // Describes whether it's used in an expression (get)
  // or an assignment (set)
  // For expression, push the value (8 bytes) onto the stack
  // For assignment, push the memory location (4 bytes) of the place to write the value into
  // onto the stack
  get: boolean = true;

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
