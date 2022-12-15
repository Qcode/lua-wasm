import AstVisitor from "../AstVisitor.js";
import AstNode from "./AstNode.js";
import Block from "./Block.js";
import Expression from "./Expression.js";

export default class WhileStatement extends AstNode {
  condition: Expression;
  block: Block;
  index: number;

  constructor(condition: Expression, block: Block) {
    super();
    this.condition = condition;
    this.block = block;
  }
  accept(v: AstVisitor): void {
    v.visitWhileStatement(this);
    this.condition.accept(v);
    v.intermediateWhileStatement(this);
    this.block.accept(v);
    v.leaveWhileStatement(this);
  }
}
