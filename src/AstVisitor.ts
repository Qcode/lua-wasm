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
