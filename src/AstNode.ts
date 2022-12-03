import AstVisitor from "./AstVisitor";

export default abstract class AstNode {
  abstract accept(v: AstVisitor): void;
}
