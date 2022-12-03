import AstVisitor from "../AstVisitor.js";
import Expression from "./Expression.js";

enum Operators {
  And = "and",
  Or = "or",
  Add = "+",
  Sub = "-",
  Mult = "*",
  FloatDiv = "/",
  FloorDiv = "//",
  Mod = "%",
  Exponent = "^",
  BitWiseAnd = "&",
  BitWiseOr = "|",
  BitWiseExclusiveOr = "~",
  RightShift = ">>",
  LeftShift = "<<",
  Equality = "==",
  Inequality = "~=",
  Lt = "<",
  Gt = ">",
  Leq = "<=",
  Geq = ">=",
  Concatenation = "..",
}

export default class BinaryOp extends Expression {
  left: Expression;
  right: Expression;
  operator: Operators;

  constructor(left: Expression, right: Expression, operator: Operators) {
    super();
    this.left = left;
    this.right = right;
    this.operator = operator;
  }

  accept(v: AstVisitor) {
    v.visitBinaryOp(this);
  }
}
