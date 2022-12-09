import AstNode from "./AstNode.js";
import AstVisitor from "../AstVisitor.js";
import ReturnStatement from "./ReturnStatement.js";
import BreakStatement from "./BreakStatement.js";
import ContinueStatement from "./ContinueStatement.js";
import Function from "./Function.js";

class Block extends AstNode {
  statements: AstNode[];
  finalStatement?: ReturnStatement | BreakStatement | ContinueStatement;

  myLocalVarNames: Set<string>;
  parentFunction: Function;

  constructor(
    statements: AstNode[],
    finalStatement?: ReturnStatement | BreakStatement | ContinueStatement
  ) {
    super();
    this.statements = statements;
    this.finalStatement = finalStatement;
    this.myLocalVarNames = new Set();
  }
  accept(v: AstVisitor) {
    v.visitBlock(this);
    this.statements.forEach((s) => s.accept(v));
    if (this.finalStatement) this.finalStatement.accept(v);
    v.leaveBlock(this);
  }

  addLocalVarName(varName: string) {
    this.myLocalVarNames.add(varName);
  }

  hasLocalVar(varName: string): boolean {
    return this.myLocalVarNames.has(varName);
  }
}

export default Block;
