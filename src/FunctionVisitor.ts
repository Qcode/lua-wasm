// Gets a list of functions in the AST for us to compile

import Function from "./ast/Function";
import AstVisitor from "./AstVisitor.js";

export default class FunctionVisitor extends AstVisitor {
  functions: Function[] = [];
  visitFunction(v: Function) {
    v.index = this.functions.length;
    this.functions.push(v);
  }
}
