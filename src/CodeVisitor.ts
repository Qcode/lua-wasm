import AstVisitor from "./AstVisitor.js";
import Function from "./ast/Function.js";
import FuncCall from "./ast/FuncCall.js";
import Variable from "./ast/Variable.js";
import NumberNode from "./ast/NumberNode.js";
import BinaryOp, { Operators } from "./ast/BinaryOp.js";
import StringNode from "./ast/StringNode.js";

enum DynamicTypes {
  NIL = 0,
  INT = 1,
  FLOAT = 2,
  BOOL = 3,
  STRING = 4,
  FUNCTION = 5,
  TABLE = 6,
}

export default class CodeVisitor extends AstVisitor {
  functions: Function[];

  functionWasms: string[];

  functionIndexes: number[] = [];

  stringLocationMap: Map<string, number>;

  constructor(functions: Function[], stringLocationMap: Map<string, number>) {
    super();
    this.functions = functions;
    this.functionWasms = new Array(this.functions.length).fill("");
    this.stringLocationMap = stringLocationMap;
  }

  visitNumberNode(n: NumberNode): void {
    // Deal with floats/ints later
    // Store type

    this.addInstruction(
      `(i32.store (global.get $SP) (i32.const ${DynamicTypes.INT}))`
    );
    // Store number
    this.addInstruction(
      `(i32.store (i32.add (i32.const 4) (global.get $SP)) (i32.const ${n.theNumber}))`
    );
    this.addInstruction(
      `(global.set $SP (i32.sub (global.get $SP) (i32.const 8)))`
    );
  }

  visitStringNode(s: StringNode): void {
    this.addInstruction(
      `(i32.store (global.get $SP) (i32.const ${DynamicTypes.STRING}))`
    );
    this.addInstruction(
      `(i32.store (i32.add (i32.const 4) (global.get $SP)) (i32.const ${this.stringLocationMap.get(
        s.theString
      )}))`
    );
    this.addInstruction(
      `(global.set $SP (i32.sub (global.get $SP) (i32.const 8)))`
    );
  }

  leaveFuncCall(f: FuncCall): void {
    // Hardcode printing for now
    if (f.theFunc instanceof Variable && f.theFunc.varName === "print") {
      this.addInstruction(
        `(i32.eq (i32.load (i32.add (i32.const 8) (global.get $SP))) (i32.const ${DynamicTypes.INT}))`
      );
      this.addInstruction("(if (then");
      this.popFromStack();
      this.addInstruction(`call $printNum`);
      this.addInstruction(") (else");
      this.popFromStack();
      this.addInstruction(`call $printString ) )`);
    }
  }

  visitFunction(v: Function): void {
    // Place function on the stack - function pointer and static link pointer
    this.functionIndexes.push(v.index);
    // To do - add results for functions that aren't the 0th
    const funcDeclaration =
      this.functionIndexes.length === 1
        ? `(func $f${v.index} (export "main")`
        : `(func $f${v.index}`;

    this.addInstruction(funcDeclaration);

    if (this.functionIndexes.length === 1) {
      for (const [string, stringLocation] of this.stringLocationMap) {
        this.addInstruction(
          `(i32.store (i32.const ${stringLocation}) (i32.const ${string.length}))`
        );
      }
    }
  }

  leaveFunction(v: Function): void {
    this.addInstruction(")");
    this.functionIndexes.pop();
  }

  leaveBinaryOp(b: BinaryOp): void {
    const instructionLookUp = {
      [Operators.Add]: "i32.add",
      [Operators.Sub]: "i32.sub",
      [Operators.Mult]: "i32.mul",
      [Operators.FloatDiv]: "i32.div_s",
    };

    this.addInstruction(`(i32.add (i32.const 20) (global.get $SP))`);

    this.addInstruction("(i32.load (i32.add (global.get $SP) (i32.const 20)))");
    this.addInstruction("(i32.load (i32.add (global.get $SP) (i32.const 12)))");

    this.addInstruction(
      `(i32.store (i32.add (i32.const 16) (global.get $SP)) (i32.const ${DynamicTypes.INT}))`
    );

    this.addInstruction(instructionLookUp[b.operator]);
    this.addInstruction("i32.store");

    this.addInstruction(
      `(global.set $SP (i32.add (global.get $SP) (i32.const 8)))`
    );
  }

  addInstruction(instruction: string) {
    this.functionWasms[this.functionIndexes.length - 1] += instruction + "\n";
  }

  popFromStack() {
    this.addInstruction(
      `(global.set $SP (i32.add (global.get $SP) (i32.const 8)))`
    );
    this.addInstruction("(i32.load (i32.add (global.get $SP) (i32.const 4)))");
  }
}
