import AstVisitor from "../AstVisitor.js";
import Expression from "./Expression.js";

export enum Operators {
  Not = "not",
  Length = "#",
  Negation = "-",
  BitwiseNot = "~",
}

export default class UnaryOp extends Expression {
  sub: Expression;
  operator: Operators;

  constructor(sub: Expression, operator: Operators) {
    super();
    this.sub = sub;
    this.operator = operator;
  }

  accept(v: AstVisitor) {
    v.visitUnaryOp(this);
    this.sub.accept(v);
    v.leaveUnaryOp(this);
  }
}
