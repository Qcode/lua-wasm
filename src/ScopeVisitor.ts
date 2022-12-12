import Block from "./ast/Block.js";
import ExpressionList from "./ast/ExpressionList.js";
import FuncCall, { CopyReturnValues } from "./ast/FuncCall.js";
import Function from "./ast/Function.js";
import LocalAssignment from "./ast/LocalAssignment.js";
import Variable from "./ast/Variable.js";
import AstVisitor from "./AstVisitor.js";

// Collect information about variables
// Each function needs to know it's local variables
// Variable assignment - need to determine if local or nonlocal, etc.
//

export default class ScopeVisitor extends AstVisitor {
  functionStack: Function[] = [];
  blockStack: Block[] = [];

  constructor() {
    super();
  }

  leaveLocalAssignment(a: LocalAssignment): void {
    const curBlock = this.blockStack[this.blockStack.length - 1];
    const curFunction = this.functionStack[this.functionStack.length - 1];
    a.names.forEach((variable) => {
      curBlock.addLocalVarName(variable);
      curFunction.addLocalVariable(curBlock, variable);
    });
    a.myBlock = curBlock;
    a.myFunction = curFunction;
  }

  visitFunction(v: Function): void {
    v.nestingDepth = this.functionStack.length;
    this.functionStack.push(v);
  }

  leaveFunction(v: Function): void {
    this.functionStack.pop();
  }

  visitBlock(b: Block): void {
    this.blockStack.push(b);
    b.parentFunction = this.functionStack[this.functionStack.length - 1];
    this.functionStack[this.functionStack.length - 1].registerBlock(b);

    b.statements.forEach((stmt) => {
      if (stmt instanceof FuncCall) {
        stmt.copyReturnValues = CopyReturnValues.Zero;
      }
    });
  }

  leaveBlock(b: Block): void {
    this.blockStack.pop();
  }

  visitVariable(v: Variable): void {
    v.usedInFunction = this.functionStack[this.functionStack.length - 1];
    // Determine whether a local or a global access
    // Local if contained in a surrounding block
    for (let x = this.blockStack.length - 1; x >= 0; x--) {
      if (this.blockStack[x].hasLocalVar(v.varName)) {
        v.surroundingBlock = this.blockStack[x];
        v.declaredInFunction = v.surroundingBlock.parentFunction;
        v.declaredInFunction.addLocalVariable(v.surroundingBlock, v.varName);
        return;
      }
    }
    v.global = true;
    v.surroundingBlock = null;
    v.declaredInFunction = null;
  }
}
