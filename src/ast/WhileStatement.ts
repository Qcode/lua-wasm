import AstVisitor from "../AstVisitor";
import AstNode from "./AstNode.js";
import Block from "./Block";
import Expression from "./Expression";

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
