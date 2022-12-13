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
import IfStatement from "./ast/IfStatement";
import BooleanNode from "./ast/BooleanNode";
import NilNode from "./ast/NilNode";
import UnaryOp from "./ast/UnaryOp";
import WhileStatement from "./ast/WhileStatement";
import LocalAssignment from "./ast/LocalAssignment";
import ExpressionList from "./ast/ExpressionList";
import TableNode from "./ast/TableNode";
import FieldAccess from "./ast/FieldAccess";

export default abstract class AstVisitor {
  visitAssignment(a: Assignment) {}
  leaveAssignment(a: Assignment) {}

  visitLocalAssignment(a: LocalAssignment) {}
  leaveLocalAssignment(a: LocalAssignment) {}

  visitBinaryOp(b: BinaryOp) {}
  intermediateBinaryOp(b: BinaryOp) {}
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

  visitExpressionList(v: ExpressionList) {}
  leaveExpressionList(v: ExpressionList) {}

  visitReturnStatement(v: ReturnStatement) {}
  leaveReturnStatement(v: ReturnStatement) {}

  visitBreakStatement(v: BreakStatement) {}

  visitIfStatement(v: IfStatement) {}
  visitIfStatementPostCond(v: IfStatement) {}
  visitIfStatementPostThen(v: IfStatement) {}
  leaveIfStatement(v: IfStatement) {}

  visitBooleanNode(v: BooleanNode) {}
  visitNilNode(v: NilNode) {}

  visitUnaryOp(v: UnaryOp) {}
  leaveUnaryOp(v: UnaryOp) {}

  visitWhileStatement(v: WhileStatement) {}
  intermediateWhileStatement(v: WhileStatement) {}
  leaveWhileStatement(v: WhileStatement) {}

  visitTableNode(v: TableNode) {}
  visitTableNodePostListElements(v: TableNode) {}
  visitTableNodePostKVPElement(v: TableNode) {}
  leaveTableNode(v: TableNode) {}

  visitFieldAccess(v: FieldAccess) {}
  leaveFieldAccess(v: FieldAccess) {}
}
