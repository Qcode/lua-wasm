import AstVisitor from "../AstVisitor";
import AstNode from "./AstNode.js";
import Block from "./Block";
import Expression from "./Expression";
import Variable from "./Variable";

export default class NumericFor extends AstNode {
  theVar: Variable;
  block: Block;
  start: Expression;
  end: Expression;
  step?: Expression;
  constructor(
    theVar: Variable,
    block: Block,
    start: Expression,
    end: Expression,
    step?: Expression
  ) {
    super();
    this.theVar = theVar;
    this.block = block;
    this.start = start;
    this.end = end;
    this.step = step;
  }
  accept(v: AstVisitor): void {
    v.visitNumericFor(this);
    this.theVar.accept(v);
    this.start.accept(v);
    this.end.accept(v);
    if (this.step) this.step.accept(v);
    this.block.accept(v);
  }
}
