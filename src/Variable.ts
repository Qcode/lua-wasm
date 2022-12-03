import AstNode from "./AstNode.js";
import AstVisitor from "./AstVisitor.js";

class Variable extends AstNode {
  // Lua supports mutliple assignment at once, so this is built in by default
  varName: string;

  constructor(varName: string) {
    super();
    this.varName = varName;
  }

  accept(v: AstVisitor) {
    v.visitVariable(this);
  }
}

export default Variable;
