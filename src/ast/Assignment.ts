import AstNode from "./AstNode.js";
import Variable from "./Variable.js";
import AstVisitor from "../AstVisitor.js";
import ExpressionList from "./ExpressionList.js";
import FieldAccess from "./FieldAccess.js";

class Assignment extends AstNode {
  // Lua supports mutliple assignment at once, so this is built in by default
  lvalues: (Variable | FieldAccess)[];
  values: ExpressionList;

  constructor(lvalues: Variable[], values: ExpressionList) {
    super();
    this.lvalues = lvalues;
    this.lvalues.forEach((variable) => (variable.get = false));
    this.values = values;
  }

  accept(v: AstVisitor) {
    v.visitAssignment(this);
    this.lvalues.forEach((variable) => variable.accept(v));
    this.values.accept(v);
    v.leaveAssignment(this);
  }
}

export default Assignment;
