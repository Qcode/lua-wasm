import AstVisitor from "./AstVisitor.js";
import Block from "./ast/Block";
import Assignment from "./ast/Assignment";
import BinaryOp from "./ast/BinaryOp";
import BreakStatement from "./ast/BreakStatement";
import ContinueStatement from "./ast/ContinueStatement";
import Expression from "./ast/Expression";
import FuncCall from "./ast/FuncCall";
import Function from "./ast/Function";
import NumberNode from "./ast/NumberNode";
import ReturnStatement from "./ast/ReturnStatement";
import StringNode from "./ast/StringNode";
import Variable from "./ast/Variable";

export default class BlockVariableDeclVisitor extends AstVisitor {
  currentBlock: Block;
  constructor() {
    super();
  }
  visitBlock(b: Block) {
    this.currentBlock = b;
  }
  visitAssignment(a: Assignment) {
    if (a.local) {
      a.variables.forEach((v) => this.currentBlock.myLocalDeclarations.push(v));
    }
  }
  visitBinaryOp(b: BinaryOp) {}
  visitBreakStatement(v: BreakStatement) {}
  visitContinueStatement(v: ContinueStatement) {}
  visitExpression(e: Expression) {}
  visitFuncCall(f: FuncCall) {}
  visitFunction(v: Function) {}
  visitNumberNode(n: NumberNode) {}
  visitReturnStatement(v: ReturnStatement) {}
  visitStringNode(s: StringNode) {}
  visitVariable(v: Variable) {}
}
