import Assignment from "./ast/Assignment.js";
import BinaryOp from "./ast/BinaryOp.js";
import Block from "./ast/Block.js";
import Expression from "./ast/Expression.js";
import FuncCall from "./ast/FuncCall.js";
import NumberNode from "./ast/NumberNode.js";
import StringNode from "./ast/StringNode.js";
import Variable from "./ast/Variable.js";
import Function from "./ast/Function.js";
import ReturnStatement from "./ast/ReturnStatement.js";
import BreakStatement from "./ast/BreakStatement.js";
import IfStatement from "./ast/IfStatement.js";
import BooleanNode from "./ast/BooleanNode.js";
import NilNode from "./ast/NilNode.js";
import UnaryOp from "./ast/UnaryOp.js";
import WhileStatement from "./ast/WhileStatement.js";
import LocalAssignment from "./ast/LocalAssignment.js";
import ExpressionList from "./ast/ExpressionList.js";
import TableNode from "./ast/TableNode.js";
import FieldAccess from "./ast/FieldAccess.js";

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
