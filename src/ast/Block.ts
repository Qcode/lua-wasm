import AstNode from "./AstNode.js";
import AstVisitor from "../AstVisitor.js";
import ReturnStatement from "./ReturnStatement.js";
import BreakStatement from "./BreakStatement.js";
import ContinueStatement from "./ContinueStatement.js";
import Variable from "./Variable.js";

class Block extends AstNode {
  statements: AstNode[];
  finalStatement?: ReturnStatement | BreakStatement | ContinueStatement;

  myLocalDeclarations: Variable[];
  constructor(
    statements: AstNode[],
    finalStatement?: ReturnStatement | BreakStatement | ContinueStatement
  ) {
    super();
    this.statements = statements;
    this.finalStatement = finalStatement;
    this.myLocalDeclarations = [];
  }
  accept(v: AstVisitor) {
    v.visitBlock(this);
    this.statements.forEach((s) => s.accept(v));
    if (this.finalStatement) this.finalStatement.accept(v);
  }
}

export default Block;
