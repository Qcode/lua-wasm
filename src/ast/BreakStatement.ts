import AstNode from "./AstNode";
import AstVisitor from "../AstVisitor";

export default class BreakStatement extends AstNode {
  constructor() {
    super();
  }
  accept(v: AstVisitor): void {
    v.visitBreakStatement(this);
  }
}
