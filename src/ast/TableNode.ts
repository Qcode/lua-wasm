import AstVisitor from "../AstVisitor.js";
import Expression from "./Expression.js";
import FuncCall, { CopyReturnValues } from "./FuncCall.js";

export default class TableNode extends Expression {
  // Those coming in a list format
  listElements: Expression[];
  // The key value pairs being inserted
  initializeWith: Map<Expression, Expression>;
  // If the final field is a function, then we need to unpack parameters
  remainingListElements?: FuncCall;

  constructor(
    listElements: Expression[],
    initializeWith: Map<Expression, Expression>,
    remainingListElements?: FuncCall
  ) {
    super();
    this.listElements = listElements;
    this.initializeWith = initializeWith;
    this.remainingListElements = remainingListElements;
    if (this.remainingListElements) {
      this.remainingListElements.copyReturnValues = CopyReturnValues.Many;
    }
  }

  accept(v: AstVisitor) {
    v.visitTableNode(this);

    // Evaluate the list elements first
    this.listElements.forEach((listElement) => listElement.accept(v));
    if (this.remainingListElements) {
      this.remainingListElements.accept(v);
    }

    v.visitTableNodePostListElements(this);

    for (const [key, value] of this.initializeWith) {
      key.accept(v);
      value.accept(v);
      v.visitTableNodePostKVPElement(this);
    }

    v.leaveTableNode(this);
  }
}
