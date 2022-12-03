import AstNode from "./AstNode";
import AstVisitor from "./AstVisitor";

export default class ContinueStatement extends AstNode {
  constructor() {
    super();
  }
  accept(v: AstVisitor): void {
    v.visitContinueStatement(this);
  }
}
