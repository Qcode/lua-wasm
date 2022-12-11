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
import ReturnStatement from "./ast/ReturnStatement.js";

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

// 4 bytes for dynamic link,
// 4 bytes for static link
const FRAME_PROLOGUE_SIZE = 8;

export default class CodeVisitor extends AstVisitor {
  functions: Function[];

  functionWasms: string[];

  functionIndexes: number[] = [];

  stringLocationMap: Map<string, number>;

  functionParamDataOffset: number;

  constructor(
    functions: Function[],
    stringLocationMap: Map<string, number>,
    functionParamDataOffset: number
  ) {
    super();
    this.functions = functions;
    this.functionWasms = new Array(this.functions.length).fill("");
    this.stringLocationMap = stringLocationMap;
    this.functionParamDataOffset = functionParamDataOffset;
  }

  visitNumberNode(n: NumberNode): void {
    // Deal with floats/ints later
    this.putOnStack(DynamicTypes.INT, `(i32.const ${n.theNumber})`);
  }

  visitNilNode(v: NilNode): void {
    this.putOnStack(DynamicTypes.NIL, `(i32.const ${DynamicTypes.NIL})`);
  }

  visitStringNode(s: StringNode): void {
    this.putOnStack(
      DynamicTypes.STRING,
      `(i32.const ${this.stringLocationMap.get(s.theString)})`
    );
  }

  visitBooleanNode(v: BooleanNode): void {
    this.putOnStack(DynamicTypes.BOOL, `(i32.const ${v.val ? 1 : 0})`);
  }

  leaveFuncCall(f: FuncCall): void {
    // Hardcode printing for now, should be stored in global table somewhere probably
    // So that they can reassign, etc.
    if (f.theFunc instanceof Variable && f.theFunc.varName === "print") {
      this.addInstruction(
        `(global.set $SP (i32.add (global.get $SP) (i32.const ${VAR_SIZE})))`
      );
      this.addInstruction(`global.get $SP`);
      this.addInstruction(`call $print`);
      return;
    }

    // At this point, we have the closure, then a bunch of expressions for parameters
    // Have to allocate space for the frame, jump there, finish, etc.
    // Pop stuff off the stack too

    // For now, assume that we have no expressions

    const funcValueLocation = `(i32.load
      (i32.add
        (global.get $SP)
        (i32.const ${VAR_SIZE * (f.args.expressions.length + 1) + 4})
      )
    )`;

    const functionIndex = `(i32.load
      ${funcValueLocation}
    )`;

    const staticLink = `(i32.load (i32.add (i32.const 4) ${funcValueLocation}))`;

    const numParams = `(i32.load
      (i32.add
        (i32.const ${this.functionParamDataOffset})
        (i32.mul (i32.const 4) ${functionIndex})
      )
    )`;

    const frameSize = `(i32.add
      (i32.const ${FRAME_PROLOGUE_SIZE})
      (i32.mul (i32.const ${VAR_SIZE}) ${numParams})
    )`;

    this.addInstruction(this.alloc(frameSize));

    const frameBase = `(i32.sub (global.get $HP) ${frameSize})`;

    // Set up static link

    this.addInstruction(`(i32.store ${frameBase} ${staticLink})`);

    // Set up dynamic link

    this.addInstruction(`(i32.store
      (i32.add (i32.const 4) ${frameBase})
      (global.get $FP)
    )`);

    // Copy arguments from stack to frame
    // TODO  Subtract from SP excess arguments if too many are passed
    this.addInstruction(
      `(memory.copy
        (i32.add (i32.const ${FRAME_PROLOGUE_SIZE}) ${frameBase})
        (i32.add
          (global.get $SP)
          (i32.const ${VAR_SIZE})
        )
        (i32.const ${VAR_SIZE * f.args.expressions.length})
      )`
    );

    this.addInstruction(`(global.set $FP ${frameBase})`);

    this.addInstruction(`(call_indirect (type $basicFunc) ${functionIndex})`);

    // Check if this is in the right place
    this.popFromStack(f.args.expressions.length + 1);

    this.addInstruction(
      `(global.set $FP (i32.load (i32.add (global.get $FP) (i32.const 4))))`
    );
  }

  visitFunction(v: Function): void {
    if (this.functionIndexes.length > 0) {
      // Closure creation

      // 4 bytes for function index
      // 4 bytes for environment pointer
      this.addInstruction(this.alloc("(i32.const 8)"));

      // Store function pointer
      this.addInstruction(
        `(i32.store (i32.sub (global.get $HP) (i32.const 8)) (i32.const ${v.index}))`
      );
      // Store static link

      const caller = this.getCurrentFunction();
      const followStaticLinkTimes = caller.nestingDepth - v.nestingDepth + 1;

      // Memory location to store in
      this.addInstruction("(i32.sub (global.get $HP) (i32.const 4))");
      // Static link (value)
      this.followStaticLink(followStaticLinkTimes);

      // Store function pointer at (i32.sub (global.get $HP) (i32.const 4))
      this.addInstruction("i32.store");

      // Place function on the stack - function pointer and static link pointer
      this.putOnStack(
        DynamicTypes.FUNCTION,
        `(i32.sub (global.get $HP) (i32.const 8))`
      );
    }
    // Now, swap to writing the code for the function we've called

    this.functionIndexes.push(v.index);
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

      // Also initialize in here the data segment, the number of parameters to each function
      // Will need to be looked up to determine for closures, how much space to allocate at runtime
      this.functions.forEach((func) => {
        this.addInstruction(
          `(i32.store (global.get $HP) (i32.const ${func.totalVars}))`
        );
        this.addInstruction(
          `(global.set $FP (i32.add (global.get $FP) (i32.const 4)))`
        );
        this.addInstruction(
          `(global.set $HP (i32.add (global.get $HP) (i32.const 4)))`
        );
      });

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

  leaveFunction(v: Function): void {
    // If we hit this point, we've not returned anything.
    // Create size 0 return array
    // End function declaration
    this.addInstruction(")");
    this.functionIndexes.pop();
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
      if (x < a.values.expressions.length) {
        //console.log(offset);
        // Copy type
        this.addInstruction(`(i32.store
          ${typeLocation}
          (i32.load (i32.add (i32.const ${
            (a.values.expressions.length - x) * VAR_SIZE
          }) (global.get $SP))))`);
        // Copy value
        this.addInstruction(`(i32.store
          ${varLocation}
          (i32.load (i32.add (i32.const ${
            (a.values.expressions.length - x) * VAR_SIZE + 4
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

    this.popFromStack(a.values.expressions.length);
  }

  leaveAssignment(a: Assignment): void {
    // For something like a, b = 1, 2
    // Stack is set up: 8 bytes for 1,
    // 8 bytes for 2,
    // 4 bytes for mem location of b,
    // 4 bytes for mem location of a

    const expressionSize = a.values.expressions.length * VAR_SIZE;

    for (let x = 0; x < a.variables.length; ++x) {
      const writeTypeTo = `(i32.load (i32.add (global.get $SP) (i32.const ${
        8 + expressionSize + (a.variables.length - x - 1) * VAR_SIZE + 4
      })))`;
      const writeValueTo = `(i32.add (i32.const 4) ${writeTypeTo})`;

      if (x < a.values.expressions.length) {
        //console.log(offset);
        // Copy type
        this.addInstruction(`(i32.store
          ${writeTypeTo}
          (i32.load (i32.add (i32.const ${
            8 + (a.values.expressions.length - x - 1) * VAR_SIZE
          }) (global.get $SP))))`);
        // Copy value
        this.addInstruction(`(i32.store
          ${writeValueTo}
          (i32.load (i32.add (i32.const ${
            8 + 4 + (a.values.expressions.length - x - 1) * VAR_SIZE
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

    this.popFromStack(a.variables.length + a.values.expressions.length);
  }

  visitVariable(v: Variable): void {
    if (!v.global) {
      const followStaticLinkTimes =
        v.usedInFunction.nestingDepth - v.declaredInFunction.nestingDepth;

      const varIndex = v.declaredInFunction.getLocal(
        v.surroundingBlock,
        v.varName
      );

      // Set type
      if (v.get) {
        // Push type
        this.addInstruction("global.get $SP");

        this.followStaticLink(followStaticLinkTimes);
        // Top of WASM stack has the frame we're accessing the variable in
        this.addInstruction(
          `(i32.const ${FRAME_PROLOGUE_SIZE + varIndex * VAR_SIZE})`
        );
        // Add the offset to this frame
        this.addInstruction("i32.add");
        // Retrieve the type at this location
        this.addInstruction("i32.load");
        // Store the type on my stack
        this.addInstruction("i32.store");
      } else {
        // Doing an assignment, so we're pushing a pointer
        this.addInstruction(
          `(i32.store (global.get $SP) (i32.const ${DynamicTypes.POINTER}))`
        );
      }

      this.addInstruction("(i32.add (global.get $SP) (i32.const 4))");

      // Now, do it again, but with the value, storing it at the value location on the stack
      this.followStaticLink(followStaticLinkTimes);

      // Now set the value
      if (v.get) {
        // Top of WASM stack has the frame we're accessing the variable in
        this.addInstruction(
          `(i32.const ${FRAME_PROLOGUE_SIZE + varIndex * VAR_SIZE + 4})`
        );

        // Add the offset to this frame
        this.addInstruction("i32.add");
        // If it's a get, we fetch the value. Otherwise, we just use the pointer to that value
        this.addInstruction("i32.load");
      } else {
        this.addInstruction(
          `(i32.const ${FRAME_PROLOGUE_SIZE + varIndex * VAR_SIZE})`
        );

        // Add the offset to this frame
        this.addInstruction("i32.add");
      }

      // Store the type on my stack
      this.addInstruction("i32.store");

      // Update SP
      this.pushSP();
    } else {
      // console.error("Global", v.varName);
    }
  }

  visitWhileStatement(v: WhileStatement): void {
    this.addInstruction(`(block $whileLoop${v.index} (loop`);
  }

  visitBreakStatement(v: BreakStatement): void {
    this.addInstruction(`br $whileLoop${v.whileStatement.index}`);
  }

  leaveReturnStatement(v: ReturnStatement): void {
    this.addInstruction(`return`);
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

    if (b.operator === Operators.Concatenation) {
      // Get lengths of the strings
      this.addInstruction("");
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
    this.functionWasms[
      this.functions[
        this.functionIndexes[this.functionIndexes.length - 1]
      ].index
    ] += instruction + "\n";
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

  alloc(size: string) {
    return `(global.set $HP
      (i32.add
        (global.get $HP)
        ${size}
      )
    )`;
  }

  putOnStack(type: DynamicTypes, value: string) {
    this.addInstruction(`(i32.store (global.get $SP) (i32.const ${type}))`);
    // Store number
    this.addInstruction(
      `(i32.store (i32.add (i32.const 4) (global.get $SP)) ${value})`
    );
    this.pushSP();
  }

  getCurrentFunction(): Function {
    return this.functions[
      this.functionIndexes[this.functionIndexes.length - 1]
    ];
  }

  followStaticLink(n: number) {
    this.addInstruction(`global.get $FP`);
    for (let x = 0; x < n; x++) {
      this.addInstruction(`i32.load`);
    }
  }
}
