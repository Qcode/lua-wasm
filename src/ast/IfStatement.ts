import AstVisitor from "../AstVisitor";
import AstNode from "./AstNode.js";
import Expression from "./Expression";
import Block from "./Block";

export default class IfStatement extends AstNode {
  condition: Expression;
  thenBlock: Block;
  elseBlock?: Block = null;
  constructor(condition: Expression, thenBlock: Block) {
    super();
    this.condition = condition;
    this.thenBlock = thenBlock;
  }
  accept(v: AstVisitor): void {
    v.visitIfStatement(this);
    this.condition.accept(v);
    v.visitIfStatementPostCond(this);
    this.thenBlock.accept(v);
    v.visitIfStatementPostThen(this);
    if (this.elseBlock) this.elseBlock.accept(v);
    v.leaveIfStatement(this);
  }
}
