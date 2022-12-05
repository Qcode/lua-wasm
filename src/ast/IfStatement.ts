import AstVisitor from "../AstVisitor";
import AstNode from "./AstNode.js";
import Expression from "./Expression";
import Block from "./Block";

export default class IfStatement extends AstNode {
  conditions: Expression[];
  blocks: Block[];
  constructor(conditions: Expression[], blocks: Block[]) {
    super();
    this.conditions = conditions;
    this.blocks = blocks;
  }
  accept(v: AstVisitor): void {
    v.visitIfStatement(this);
    this.conditions.forEach((cond) => cond.accept(v));
    this.blocks.forEach((block) => block.accept(v));
  }
}
