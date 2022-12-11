import AstVisitor from "../AstVisitor.js";
import Expression from "./Expression.js";
import ExpressionList from "./ExpressionList.js";

export enum CopyReturnValues {
  Zero,
  One,
  Many,
}

export default class FuncCall extends Expression {
  theFunc: Expression;
  args: ExpressionList;

  copyReturnValues = CopyReturnValues.One;

  constructor(theFunc: Expression, args: ExpressionList) {
    super();
    this.theFunc = theFunc;
    this.args = args;
  }

  accept(v: AstVisitor) {
    v.visitFuncCall(this);
    this.theFunc.accept(v);
    this.args.accept(v);
    v.leaveFuncCall(this);
  }
}
