import Assignment from "./ast/Assignment";
import BinaryOp from "./ast/BinaryOp";
import Block from "./ast/Block";
import Expression from "./ast/Expression";
import FuncCall from "./ast/FuncCall";
import NumberNode from "./ast/NumberNode";
import StringNode from "./ast/StringNode";
import Variable from "./ast/Variable";
import Function from "./ast/Function";
import ReturnStatement from "./ast/ReturnStatement";
import BreakStatement from "./ast/BreakStatement";
import ContinueStatement from "./ast/ContinueStatement";
import IfStatement from "./ast/IfStatement";
import BooleanNode from "./ast/BooleanNode";
import NilNode from "./ast/NilNode";
import UnaryOp from "./ast/UnaryOp";
import WhileStatement from "./ast/WhileStatement";
import Repeat from "./ast/Repeat";
import NumericFor from "./ast/NumericFor";
import LocalAssignment from "./ast/LocalAssignment";

export default abstract class AstVisitor {
  visitAssignment(a: Assignment) {}
  leaveAssignment(a: Assignment) {}

  visitLocalAssignment(a: LocalAssignment) {}
  leaveLocalAssignment(a: LocalAssignment) {}

  visitBinaryOp(b: BinaryOp) {}
  leaveBinaryOp(b: BinaryOp) {}

  visitBlock(b: Block) {}
  leaveBlock(b: Block) {}

  visitExpression(e: Expression) {}

  visitFuncCall(f: FuncCall) {}
  leaveFuncCall(f: FuncCall) {}

  visitNumberNode(n: NumberNode) {}
  visitStringNode(s: StringNode) {}
  visitVariable(v: Variable) {}

  visitFunction(v: Function) {}
  leaveFunction(v: Function) {}

  visitReturnStatement(v: ReturnStatement) {}
  visitBreakStatement(v: BreakStatement) {}
  visitContinueStatement(v: ContinueStatement) {}
  visitIfStatement(v: IfStatement) {}
  visitBooleanNode(v: BooleanNode) {}
  visitNilNode(v: NilNode) {}
  visitUnaryOp(v: UnaryOp) {}
  visitWhileStatement(v: WhileStatement) {}
  visitRepeat(v: Repeat) {}
  visitNumericFor(v: NumericFor) {}
}
