import AstVisitor from "../AstVisitor.js";
import Block from "./Block.js";
import Function from "./Function.js";
import Expression from "./Expression.js";
import FieldAccess from "./FieldAccess.js";

class Variable extends Expression {
  // Lua supports mutliple assignment at once, so this is built in by default
  varName: string;
  surroundingBlock: Block;
  usedInFunction: Function;
  declaredInFunction: Function;

  global: boolean = false;
  globalFieldAccess?: FieldAccess;
  // Describes whether it's used in an expression (get)
  // or an assignment (set)
  // For expression, push the value (8 bytes) onto the stack
  // For assignment, push the memory location (4 bytes) of the variable
  // onto the stack
  get: boolean = true;

  constructor(varName: string) {
    super();
    this.varName = varName;
  }

  accept(v: AstVisitor) {
    v.visitVariable(this);
    if (this.global) {
      this.globalFieldAccess.accept(v);
    }
  }
}

export default Variable;
