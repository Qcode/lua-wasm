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

export default abstract class AstVisitor {
  abstract visitAssignment(a: Assignment);

  abstract visitBinaryOp(b: BinaryOp);

  abstract visitBlock(b: Block);
  abstract visitExpression(e: Expression);

  abstract visitFuncCall(f: FuncCall);

  abstract visitNumberNode(n: NumberNode);
  abstract visitStringNode(s: StringNode);
  abstract visitVariable(v: Variable);

  abstract visitFunction(v: Function);
  abstract visitReturnStatement(v: ReturnStatement);
  abstract visitBreakStatement(v: BreakStatement);
  abstract visitContinueStatement(v: ContinueStatement);
  abstract visitIfStatement(v: IfStatement);
  abstract visitBooleanNode(v: BooleanNode);
  abstract visitNilNode(v: NilNode);
  abstract visitUnaryOp(v: UnaryOp);
  abstract visitWhileStatement(v: WhileStatement);
  abstract visitRepeat(v: Repeat);
  abstract visitNumericFor(v: NumericFor);
}
