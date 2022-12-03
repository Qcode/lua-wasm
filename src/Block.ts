import AstNode from "./AstNode.js";
import AstVisitor from "./AstVisitor.js";

class Block extends AstNode {
  statements: AstNode[];
  constructor(statements: AstNode[]) {
    super();
    this.statements = statements;
  }
  accept(v: AstVisitor) {
    v.visitBlock(this);
    this.statements.forEach((s) => s.accept(v));
  }
}

export default Block;
