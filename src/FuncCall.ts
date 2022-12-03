import AstVisitor from "./AstVisitor.js";
import Expression from "./Expression.js";
import Variable from "./Variable.js";

export default class FuncCall extends Expression {
  theFunc: Variable | Expression;
  args: Expression[];

  constructor(theFunc: Variable | Expression, args: Expression[]) {
    super();
    this.theFunc = theFunc;
    this.args = args;
  }

  accept(v: AstVisitor) {
    v.visitFuncCall(this);
    this.theFunc.accept(v);
    this.args.forEach((arg) => arg.accept(v));
  }
}
