import AstNode from "./AstNode.js";
import Variable from "./Variable.js";
import Expression from "./Expression.js";
import AstVisitor from "./AstVisitor.js";

class Assignment extends AstNode {
  // Lua supports mutliple assignment at once, so this is built in by default
  variables: Variable[];
  values: Expression[];
  local: boolean;

  constructor(variables: Variable[], values: Expression[], local: boolean) {
    super();
    this.variables = variables;
    this.values = values;
    this.local = local;
  }

  accept(v: AstVisitor) {
    v.visitAssignment(this);
    this.variables.forEach((variable) => variable.accept(v));
    this.values.forEach((val) => val.accept(v));
  }
}

export default Assignment;
