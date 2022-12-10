import AstNode from "./AstNode.js";
import AstVisitor from "../AstVisitor";
import WhileStatement from "./WhileStatement.js";

export default class BreakStatement extends AstNode {
  whileStatement: WhileStatement;
  constructor() {
    super();
  }
  accept(v: AstVisitor): void {
    v.visitBreakStatement(this);
  }
}
