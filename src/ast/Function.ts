import Expression from "./Expression.js";
import AstVisitor from "../AstVisitor.js";
import Variable from "./Variable.js";
import Block from "./Block.js";

export default class Function extends Expression {
  parameters: Variable[] = [];
  body: Block;
  constructor(parameters: Variable[], body: Block) {
    super();
    this.parameters = parameters;
    this.body = body;
  }
  accept(v: AstVisitor) {
    v.visitFunction(this);
    this.parameters.forEach((param) => param.accept(v));
    this.body.accept(v);
  }
}
