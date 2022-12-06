import AstNode from "./AstNode.js";
import AstVisitor from "../AstVisitor.js";
import Block from "./Block.js";
import Function from "./Function.js";

class Variable extends AstNode {
  // Lua supports mutliple assignment at once, so this is built in by default
  varName: string;
  surroundingBlock: Block;
  usedInFunction: Function;
  declaredInFunction: Function;

  global: boolean = false;

  constructor(varName: string) {
    super();
    this.varName = varName;
  }

  accept(v: AstVisitor) {
    v.visitVariable(this);
  }
}

export default Variable;
