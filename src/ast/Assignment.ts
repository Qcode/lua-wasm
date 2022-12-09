import AstNode from "./AstNode.js";
import Variable from "./Variable.js";
import Expression from "./Expression.js";
import AstVisitor from "../AstVisitor.js";

class Assignment extends AstNode {
  // Lua supports mutliple assignment at once, so this is built in by default
  variables: Variable[];
  values: Expression[];

  constructor(variables: Variable[], values: Expression[]) {
    super();
    this.variables = variables;
    this.variables.forEach((variable) => (variable.get = false));
    this.values = values;
  }

  accept(v: AstVisitor) {
    v.visitAssignment(this);
    this.variables.forEach((variable) => variable.accept(v));
    this.values.forEach((val) => val.accept(v));
    v.leaveAssignment(this);
  }
}

export default Assignment;
