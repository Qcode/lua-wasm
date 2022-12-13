import AstVisitor from "../AstVisitor.js";
import Expression from "./Expression.js";

export default class TableNode extends Expression {
  // All tables are constructed to be empty
  // We transform table constructors according to 3.4.9 in the Lua 5.3 reference manual
  constructor() {
    super();
  }
  accept(v: AstVisitor) {
    v.visitTableNode(this);
  }
}
