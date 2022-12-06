import AstVisitor from "../AstVisitor";
import AstNode from "./AstNode.js";
import Expression from "./Expression";

export default class LocalAssignment extends AstNode {
  names: string[];
  values: Expression[];

  constructor(names: string[], values: Expression[]) {
    super();
    this.names = names;
    this.values = values;
  }

  accept(v: AstVisitor) {
    v.visitLocalAssignment(this);
    this.values.forEach((value) => value.accept(v));
    v.leaveLocalAssignment(this);
  }
}
