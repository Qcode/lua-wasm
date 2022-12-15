import AstVisitor from "../AstVisitor.js";

export default abstract class AstNode {
  abstract accept(v: AstVisitor): void;
}
