import Expression from "./Expression.js";
import AstVisitor from "../AstVisitor.js";
import Block from "./Block.js";

export default class Function extends Expression {
  parameters: string[];
  body: Block;
  customBody?: string;

  nestingDepth: number = 0;

  localVariables: Map<Block, Map<string, number>>;
  totalVars: number = 0;

  // Where is the function stored inside our WASM table?
  index: number = 0;

  constructor(parameters: string[], body: Block) {
    super();
    this.parameters = parameters;
    this.body = body;
    this.localVariables = new Map();

    this.localVariables.set(this.body, new Map());
    this.parameters.forEach((param) => {
      this.localVariables.get(this.body).set(param, this.totalVars);
      this.body.addLocalVarName(param);
      this.totalVars += 1;
    });
  }

  accept(v: AstVisitor) {
    v.visitFunction(this);
    this.body.accept(v);
    v.leaveFunction(this);
  }

  registerBlock(block: Block) {
    if (!this.localVariables.has(block)) {
      this.localVariables.set(block, new Map());
    }
  }

  addLocalVariable(block: Block, variable: string) {
    if (!this.localVariables.get(block).has(variable)) {
      this.localVariables.get(block).set(variable, this.totalVars);
      this.totalVars += 1;
    }
  }

  getLocal(block: Block, variable: string) {
    return this.localVariables.get(block).get(variable);
  }
}
