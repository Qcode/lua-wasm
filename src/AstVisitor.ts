import Assignment from "./Assignment";
import BinaryOp from "./BinaryOp";
import Block from "./Block";
import Expression from "./Expression";
import FuncCall from "./FuncCall";
import NumberNode from "./NumberNode";
import StringNode from "./StringNode";
import Variable from "./Variable";
import Function from "./Function";
import ReturnStatement from "./ReturnStatement";
import BreakStatement from "./BreakStatement";
import ContinueStatement from "./ContinueStatement";

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
}
