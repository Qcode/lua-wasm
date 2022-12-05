import AstVisitor from "../AstVisitor";
import AstNode from "./AstNode.js";
import Block from "./Block";
import Expression from "./Expression";

export default class Repeat extends AstNode {
  condition: Expression;
  block: Block;
  constructor(condition: Expression, block: Block) {
    super();
    this.condition = condition;
    this.block = block;
  }
  accept(v: AstVisitor): void {
    v.visitRepeat(this);
    this.block.accept(v);
    this.condition.accept(v);
  }
}
