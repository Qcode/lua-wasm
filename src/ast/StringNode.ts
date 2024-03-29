import AstVisitor from "../AstVisitor.js";
import Expression from "./Expression.js";

export default class StringNode extends Expression {
  theString: string;
  constructor(theString: string) {
    super();
    this.theString = theString;
    // Remove surrounding quotes
    if (
      theString.charAt(0) === '"' &&
      theString.charAt(theString.length - 1) === '"'
    ) {
      this.theString = theString.substring(1, theString.length - 1);
    }
  }
  accept(v: AstVisitor) {
    v.visitStringNode(this);
  }
}
