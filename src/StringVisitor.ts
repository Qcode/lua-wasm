// Accumulates all the strings stored for the data segment
// As well as uses of non local variables, since the global table
// _G is indexed by strings

import Assignment from "./Assignment";
import AstVisitor from "./AstVisitor";
import BinaryOp from "./BinaryOp";
import Block from "./Block";
import BreakStatement from "./BreakStatement";
import ContinueStatement from "./ContinueStatement";
import Expression from "./Expression";
import FuncCall from "./FuncCall";
import Function from "./Function";
import NumberNode from "./NumberNode";
import ReturnStatement from "./ReturnStatement";
import StringNode from "./StringNode";
import Variable from "./Variable";

export default class StringVisitor extends AstVisitor {
  stringList = [];
  constructor() {
    super();
  }
  visitAssignment(a: Assignment) {}
  visitBinaryOp(b: BinaryOp) {}
  visitBlock(b: Block) {}
  visitExpression(e: Expression) {}
  visitFuncCall(f: FuncCall) {}
  visitNumberNode(n: NumberNode) {}
  visitStringNode(s: StringNode) {}
  visitVariable(v: Variable) {}
  visitFunction(v: Function) {}
  visitReturnStatement(v: ReturnStatement) {}
  visitBreakStatement(v: BreakStatement) {}
  visitContinueStatement(v: ContinueStatement) {}
}
