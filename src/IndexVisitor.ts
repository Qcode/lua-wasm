// Gets a list of functions in the AST for us to compile
// Assigns indexes to functions and while loops

import BreakStatement from "./ast/BreakStatement";
import Function from "./ast/Function";
import WhileStatement from "./ast/WhileStatement";
import AstVisitor from "./AstVisitor.js";

export default class IndexVisitor extends AstVisitor {
  functions: Function[] = [];
  whileStatementCount = 0;
  mostRecentWhileStatement: WhileStatement;

  visitFunction(v: Function) {
    v.index = this.functions.length;
    this.functions.push(v);
  }
  visitWhileStatement(v: WhileStatement): void {
    v.index = this.whileStatementCount;
    this.whileStatementCount++;
    this.mostRecentWhileStatement = v;
  }

  visitBreakStatement(v: BreakStatement): void {
    v.whileStatement = this.mostRecentWhileStatement;
  }
}
