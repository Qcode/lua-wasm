import AstNode from "./AstNode";

export default class CodeGeneration {
  generateCode(parseTree: AstNode) {
    const prologue = `(module
        (import "js" "mem" (memory 1))`;

    return prologue;
  }
}
