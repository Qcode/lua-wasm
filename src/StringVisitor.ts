import StringNode from "./ast/StringNode.js";
import Variable from "./ast/Variable.js";
import AstVisitor from "./AstVisitor.js";

export default class StringVistor extends AstVisitor {
  strings: Set<String>;

  constructor() {
    super();
    this.strings = new Set();
  }

  visitStringNode(s: StringNode): void {
    this.strings.add(s.theString);
  }

  visitVariable(v: Variable): void {
    if (v.global) {
      this.strings.add(v.varName);
    }
  }
}
