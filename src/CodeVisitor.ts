import AstVisitor from "./AstVisitor.js";
import Function from "./ast/Function.js";
import FuncCall from "./ast/FuncCall.js";
import Variable from "./ast/Variable.js";
import NumberNode from "./ast/NumberNode.js";
import BinaryOp, { Operators } from "./ast/BinaryOp.js";
import StringNode from "./ast/StringNode.js";
import LocalAssignment from "./ast/LocalAssignment.js";
import NilNode from "./ast/NilNode.js";
import BooleanNode from "./ast/BooleanNode.js";
import Assignment from "./ast/Assignment.js";
import WhileStatement from "./ast/WhileStatement.js";
import IfStatement from "./ast/IfStatement.js";
import UnaryOp, { Operators as UnaryOperators } from "./ast/UnaryOp.js";
import BreakStatement from "./ast/BreakStatement.js";

enum DynamicTypes {
  NIL = 0,
  INT = 1,
  FLOAT = 2,
  BOOL = 3,
  STRING = 4,
  FUNCTION = 5,
  TABLE = 6,
  RETURNARRAY = 7, // These types aren't exposed to the user
  POINTER = 8,
}

// Variables contain a 4 byte type and a 4 byte value
const VAR_SIZE = 8;

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

    this.pushSP();
  }

  visitNilNode(v: NilNode): void {
    this.addInstruction(
      `(i32.store (global.get $SP) (i32.const ${DynamicTypes.NIL}))`
    );
    // Store number
    this.addInstruction(
      `(i32.store (i32.add (i32.const 4) (global.get $SP)) (i32.const ${DynamicTypes.NIL}))`
    );

    this.pushSP();
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
    this.pushSP();
  }

  visitBooleanNode(v: BooleanNode): void {
    this.addInstruction(
      `(i32.store (global.get $SP) (i32.const ${DynamicTypes.BOOL}))`
    );
    this.addInstruction(
      `(i32.store (i32.add (i32.const 4) (global.get $SP)) (i32.const ${
        v.val ? 1 : 0
      }))`
    );
    this.pushSP();
  }

  leaveFuncCall(f: FuncCall): void {
    // Hardcode printing for now
    if (f.theFunc instanceof Variable && f.theFunc.varName === "print") {
      this.addInstruction(
        `(global.set $SP (i32.add (global.get $SP) (i32.const ${VAR_SIZE})))`
      );
      this.addInstruction(`global.get $SP`);
      this.addInstruction(`call $print`);
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
      // First function has a special prologue - initialize space for local parameters

      for (const [string, stringLocation] of this.stringLocationMap) {
        this.addInstruction(
          `(i32.store (i32.const ${stringLocation}) (i32.const ${string.length}))`
        );
      }

      // Static Link
      this.addInstruction(`(i32.store (global.get $FP) (i32.const -1))`);
      // Dynamic Link
      this.addInstruction(
        `(i32.store (i32.add (i32.const 4) (global.get $FP)) (i32.const -1))`
      );

      // All the rest of memory is initialized to 0s by default, so just adjust the heap pointer
      // so it's not writing over the frame pointer
      this.addInstruction(
        `(global.set $HP (i32.add (global.get $HP) (i32.const ${
          8 + 8 * v.totalVars
        })))`
      );
    }
  }

  leaveLocalAssignment(a: LocalAssignment): void {
    // For now, assume that no function calls happen
    // For local a, b, c = 1, 2, 3
    // The stack has 3 on the top, 2 below, 1 at the bottom
    for (let x = 0; x < a.names.length; ++x) {
      const offset = a.myFunction.getLocal(a.myBlock, a.names[x]);

      const typeLocation = `(i32.add (global.get $FP) (i32.const ${
        VAR_SIZE * offset + 8
      }))`;
      const varLocation = `(i32.add (global.get $FP) (i32.const ${
        VAR_SIZE * offset + 8 + 4
      }))`;
      if (x < a.values.length) {
        //console.log(offset);
        // Copy type
        this.addInstruction(`(i32.store
          ${typeLocation}
          (i32.load (i32.add (i32.const ${
            (a.values.length - x) * VAR_SIZE
          }) (global.get $SP))))`);
        // Copy value
        this.addInstruction(`(i32.store
          ${varLocation}
          (i32.load (i32.add (i32.const ${
            (a.values.length - x) * VAR_SIZE + 4
          }) (global.get $SP))))`);
      } else {
        // Set to nil
        this.addInstruction(`(i32.store
          ${typeLocation}
          (i32.const ${DynamicTypes.NIL})
          )`);
        this.addInstruction(`(i32.store
            ${varLocation}
            (i32.const ${DynamicTypes.NIL})
            )`);
      }
    }

    this.popFromStack(a.values.length);
  }

  leaveAssignment(a: Assignment): void {
    // For something like a, b = 1, 2
    // Stack is set up: 8 bytes for 1,
    // 8 bytes for 2,
    // 4 bytes for mem location of b,
    // 4 bytes for mem location of a

    const expressionSize = a.values.length * VAR_SIZE;

    for (let x = 0; x < a.variables.length; ++x) {
      const writeTypeTo = `(i32.load (i32.add (global.get $SP) (i32.const ${
        8 + expressionSize + (a.variables.length - x - 1) * VAR_SIZE + 4
      })))`;
      const writeValueTo = `(i32.add (i32.const 4) ${writeTypeTo})`;

      if (x < a.values.length) {
        //console.log(offset);
        // Copy type
        this.addInstruction(`(i32.store
          ${writeTypeTo}
          (i32.load (i32.add (i32.const ${
            8 + (a.values.length - x - 1) * VAR_SIZE
          }) (global.get $SP))))`);
        // Copy value
        this.addInstruction(`(i32.store
          ${writeValueTo}
          (i32.load (i32.add (i32.const ${
            8 + 4 + (a.values.length - x - 1) * VAR_SIZE
          }) (global.get $SP))))`);
      } else {
        // Set to nil
        this.addInstruction(`(i32.store
          ${writeTypeTo}
          (i32.const ${DynamicTypes.NIL})
          )`);
        this.addInstruction(`(i32.store
            ${writeValueTo}
            (i32.const ${DynamicTypes.NIL})
            )`);
      }
    }

    this.popFromStack(a.variables.length + a.values.length);
  }

  visitVariable(v: Variable): void {
    if (v.get && !v.global) {
      const followStaticLinkTimes =
        v.usedInFunction.nestingDepth - v.declaredInFunction.nestingDepth;

      for (let x = 0; x < followStaticLinkTimes; ++x) {
        // Follow static link code
      }

      const varIndex = v.declaredInFunction.getLocal(
        v.surroundingBlock,
        v.varName
      );

      // Push type
      this.addInstruction(`(i32.store
        (global.get $SP)
        (i32.load (i32.add (i32.const ${
          8 + varIndex * VAR_SIZE
        }) (global.get $FP))))`);

      // Push Value
      this.addInstruction(`(i32.store
        (i32.add (i32.const 4) (global.get $SP))
        (i32.load (i32.add (i32.const ${
          8 + 4 + varIndex * VAR_SIZE
        }) (global.get $FP))))`);

      // Update SP
      this.pushSP();
    } else if (v.get && v.global) {
    } else if (!v.get && !v.global) {
      const followStaticLinkTimes =
        v.usedInFunction.nestingDepth - v.declaredInFunction.nestingDepth;

      for (let x = 0; x < followStaticLinkTimes; ++x) {
        // Follow static link code
      }

      const varIndex = v.declaredInFunction.getLocal(
        v.surroundingBlock,
        v.varName
      );

      this.addInstruction(
        `(i32.store (global.get $SP) (i32.const ${DynamicTypes.POINTER}))`
      );

      this.addInstruction(
        `(i32.store (i32.add (i32.const 4) (global.get $SP)) (i32.add (i32.const ${
          8 + varIndex * VAR_SIZE
        }) (global.get $FP)))`
      );

      this.pushSP();
    } else {
      // set a global variable
    }
  }

  visitWhileStatement(v: WhileStatement): void {
    this.addInstruction(`(block $whileLoop${v.index} (loop`);
  }

  visitBreakStatement(v: BreakStatement): void {
    this.addInstruction(`br $whileLoop${v.whileStatement.index}`);
  }

  intermediateWhileStatement(v: WhileStatement): void {
    this.popFromStack();

    // Break out of loop if false
    this.addInstruction(`(br_if 1 ${this.negate(this.boolToWasmStack())})`);
  }

  leaveWhileStatement(v: WhileStatement): void {
    this.addInstruction("br 0");
    this.addInstruction("))");
  }

  leaveFunction(v: Function): void {
    this.addInstruction(")");
    this.functionIndexes.pop();
  }

  visitBinaryOp(b: BinaryOp): void {
    if (b.operator === Operators.And || b.operator === Operators.Or) {
      this.addInstruction("(block");
    }
  }

  intermediateBinaryOp(b: BinaryOp): void {
    if (b.operator === Operators.And) {
      // Jump to end of expression if first arg is false/nil,
      // we leave the first argument on the stack
      this.addInstruction(
        `(br_if 0 ${this.negate(this.boolToWasmStack(false))})`
      );
      this.popFromStack();
    } else if (b.operator === Operators.Or) {
      // Jump to end of loop if first arg is truthy
      // Leave first argument on the stack
      this.addInstruction(`(br_if 0 ${this.boolToWasmStack(false)})`);
      this.popFromStack();
    }
  }

  leaveBinaryOp(b: BinaryOp): void {
    if (b.operator === Operators.And || b.operator === Operators.Or) {
      // In this case, we've evaluated the first and the second is the top of the stack
      // So we just close our block and early return
      this.addInstruction(")");
      return;
    }

    const instructionTypeLookUp = {
      [Operators.Add]: { instruction: "i32.add", type: DynamicTypes.INT },
      [Operators.Sub]: { instruction: "i32.sub", type: DynamicTypes.INT },
      [Operators.Mult]: { instruction: "i32.mul", type: DynamicTypes.INT },
      [Operators.FloatDiv]: {
        instruction: "i32.div_s",
        type: DynamicTypes.INT,
      },
      [Operators.Mod]: { instruction: "i32.rem_s", type: DynamicTypes.INT },
      [Operators.Lt]: { instruction: "i32.lt_s", type: DynamicTypes.BOOL },
      [Operators.Gt]: { instruction: "i32.gt_s", type: DynamicTypes.BOOL },
      [Operators.Equality]: { instruction: "i32.eq", type: DynamicTypes.BOOL },
      [Operators.Inequality]: {
        instruction: "i32.ne",
        type: DynamicTypes.BOOL,
      },
      [Operators.Geq]: { instruction: "i32.ge_s", type: DynamicTypes.BOOL },
      [Operators.Leq]: { instruction: "i32.le_s", type: DynamicTypes.BOOL },
    };

    this.addInstruction(`(i32.add (i32.const 20) (global.get $SP))`);

    this.addInstruction("(i32.load (i32.add (global.get $SP) (i32.const 20)))");
    this.addInstruction("(i32.load (i32.add (global.get $SP) (i32.const 12)))");

    this.addInstruction(
      `(i32.store (i32.add (i32.const 16) (global.get $SP)) (i32.const ${
        instructionTypeLookUp[b.operator].type
      }))`
    );

    this.addInstruction(instructionTypeLookUp[b.operator].instruction);
    this.addInstruction("i32.store");

    this.addInstruction(
      `(global.set $SP (i32.add (global.get $SP) (i32.const 8)))`
    );
  }

  leaveUnaryOp(v: UnaryOp): void {
    if (v.operator === UnaryOperators.Not) {
      // Set the value to be 0/1 (true or false)
      this.addInstruction(`(i32.store
        (i32.add
          (global.get $SP)
          (i32.const ${VAR_SIZE + 4})
        )
        ${this.negate(this.boolToWasmStack(false))}
      )`);
      // Set the type to now be boolean
      this.addInstruction(
        `(i32.store (i32.add (global.get $SP) (i32.const ${VAR_SIZE})) (i32.const ${DynamicTypes.BOOL}))`
      );
    }
  }

  addInstruction(instruction: string) {
    this.functionWasms[this.functionIndexes.length - 1] += instruction + "\n";
  }

  visitIfStatementPostCond(v: IfStatement): void {
    // Condition is at the top of the stack
    this.popFromStack();
    this.addInstruction(this.boolToWasmStack());
    this.addInstruction("(if (then ");
  }

  visitIfStatementPostThen(v: IfStatement) {
    this.addInstruction(") (else");
  }

  leaveIfStatement(v: IfStatement): void {
    this.addInstruction("))");
  }

  popFromStack(n: number = 1) {
    this.addInstruction(
      `(global.set $SP (i32.add (global.get $SP) (i32.const ${n * VAR_SIZE})))`
    );
  }

  pushSP() {
    this.addInstruction(
      `(global.set $SP (i32.sub (global.get $SP) (i32.const 8)))`
    );
  }

  fetchTypeJustPopped() {
    return "(i32.load (global.get $SP))";
  }

  fetchValueJustPopped() {
    return "(i32.load (i32.add (global.get $SP) (i32.const 4)))";
  }

  fetchTypeWithoutPopping() {
    return `(i32.load
      (i32.add
        (global.get $SP)
        (i32.const ${VAR_SIZE})
      )
    )`;
  }

  fetchValueWithoutPopping() {
    return `(i32.load
      (i32.add
        (global.get $SP)
        (i32.const ${4 + VAR_SIZE})
      )
    )`;
  }

  boolToWasmStack(popped = true) {
    // Assumes SP has just been popped, is pointing at top element
    return `(i32.and
              (i32.ne
                ${
                  popped
                    ? this.fetchTypeJustPopped()
                    : this.fetchTypeWithoutPopping()
                }
                (i32.const ${DynamicTypes.NIL})
              )
              (i32.or
                (i32.ne
                  ${
                    popped
                      ? this.fetchTypeJustPopped()
                      : this.fetchTypeWithoutPopping()
                  }
                  (i32.const ${DynamicTypes.BOOL})
                )
                (i32.ne ${
                  popped
                    ? this.fetchValueJustPopped()
                    : this.fetchValueWithoutPopping()
                } (i32.const 0))
              )
            )
    `;
  }

  negate(value: string) {
    return `(i32.xor (i32.const 1) ${value} )`;
  }
}
