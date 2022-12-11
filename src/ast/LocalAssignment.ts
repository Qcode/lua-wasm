import AstVisitor from "../AstVisitor";
import AstNode from "./AstNode.js";
import Block from "./Block";
import Function from "./Function";
import ExpressionList from "./ExpressionList";

export default class LocalAssignment extends AstNode {
  names: string[];
  values: ExpressionList;
  myBlock: Block;
  myFunction: Function;

  constructor(names: string[], values: ExpressionList) {
    super();
    this.names = names;
    this.values = values;
  }

  accept(v: AstVisitor) {
    v.visitLocalAssignment(this);
    this.values.accept(v);
    v.leaveLocalAssignment(this);
  }
}
