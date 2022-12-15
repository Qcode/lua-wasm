import AstVisitor from "./AstVisitor.js";
import Function from "./ast/Function.js";
import FuncCall, { CopyReturnValues } from "./ast/FuncCall.js";
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
import ExpressionList from "./ast/ExpressionList.js";
import TableNode from "./ast/TableNode.js";

export enum DynamicTypes {
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

import {
  VAR_SIZE,
  FRAME_PROLOGUE_SIZE,
  HASH_PROLOGUE_SIZE,
  HASH_KVP_SIZE,
} from "./constants.js";

import FieldAccess from "./ast/FieldAccess.js";

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
    // At this point, we have the closure, then a bunch of expressions for parameters
    // Have to allocate space for the frame, jump there, finish, etc.
    // Pop stuff off the stack too

    const funcValueLocation = `(i32.load
      (i32.add
        (global.get $SP)
        (i32.const ${VAR_SIZE * (f.args.expressions.length + 2) + 4})
      )
    )`;

    const functionIndex = `(i32.load
      ${funcValueLocation}
    )`;

    // Our function needs to know how many arguments it was called with, so put that on the stack

    this.putOnStack(
      DynamicTypes.INT,
      `(i32.const ${f.args.expressions.length})`
    );

    this.addInstruction(`(call_indirect
      (type $basicFunc)
      ${functionIndex}
    )`);

    // Set frame pointer back to appropriate place
    this.addInstruction(
      `(global.set $FP (i32.load (i32.add (global.get $FP) (i32.const 4))))`
    );

    // At this point, top of the stack should be a returnarray variable

    // If it's just a plain old function call, discard the return array
    if (f.copyReturnValues === CopyReturnValues.Zero) {
      this.popFromStack(1);
    } else if (f.copyReturnValues === CopyReturnValues.One) {
      // If it's used in an if statement or while loop, or other plain expression
      // Then we just extract the first thing from the list
      const returnObjectMemAddress = `(i32.load
        (i32.add
          (global.get $SP)
          (i32.const ${VAR_SIZE + 4})
        )
      )`;

      // Perform a memory copy, always overwriting the return object variable
      // If one - we just copy the first value.
      // Otherwise, we copy the entire thing, plus the number of varaibles used
      // This is in the case where we've evaluated an expression list
      this.addInstruction(`(memory.copy
        (i32.add (global.get $SP) (i32.const ${VAR_SIZE}))
        (i32.add
          (i32.const 4)
          ${returnObjectMemAddress}
        )
        (i32.const ${VAR_SIZE})
      )`);
    }
  }

  visitFunction(v: Function): void {
    if (this.functionIndexes.length > 0) {
      // Closure creation

      // 4 bytes for function index
      // 4 bytes for environment pointer
      this.alloc("(i32.const 8)");

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

      // Static Link
      this.addInstruction(`(i32.store (global.get $FP) (i32.const -1))`);
      // Dynamic Link
      this.addInstruction(
        `(i32.store (i32.add (i32.const 4) (global.get $FP)) (i32.const -1))`
      );
      // Number of parameters
      this.addInstruction(
        `(i32.store (i32.add (i32.const 8) (global.get $FP)) (i32.const ${v.totalVars}))`
      );
      // All the rest of memory is initialized to 0s by default, so just adjust the heap pointer
      // so it's not writing over the frame pointer
      this.addInstruction(
        `(global.set $HP (i32.add (global.get $HP) (i32.const ${
          FRAME_PROLOGUE_SIZE + VAR_SIZE * v.totalVars
        })))`
      );
    } else {
      // Entering a function
      // We have the number of args given as the top parameter
      // Now we're vibing

      const argsPassed = `(i32.load (i32.add (i32.const 12) (global.get $SP)))`;

      const frameSize = `(i32.const ${
        FRAME_PROLOGUE_SIZE + VAR_SIZE * v.totalVars
      })`;

      this.alloc(frameSize);

      const frameBase = `(i32.sub (global.get $HP) ${frameSize})`;

      // Set up static link
      const funcValueLocation = `(i32.load
        (i32.add
          (global.get $SP)
          (i32.add
            (i32.mul
              (i32.const ${VAR_SIZE})
              ${argsPassed}
            )
            (i32.const 20)
          )
        )
      )`;
      const staticLink = `(i32.load (i32.add (i32.const 4) ${funcValueLocation}))`;

      this.addInstruction(`(i32.store ${frameBase} ${staticLink})`);

      // Set up dynamic link

      this.addInstruction(`(i32.store
        (i32.add (i32.const 4) ${frameBase})
        (global.get $FP)
      )`);

      this.addInstruction(`(i32.store
        (i32.add (i32.const 8) ${frameBase})
        (i32.const ${v.totalVars})
      )`);

      // Set frame pointer
      this.addInstruction(`(global.set $FP ${frameBase})`);

      // Copy arguments from stack to frame
      for (let x = 0; x < v.parameters.length; x++) {
        const argBase = `(i32.add
          (global.get $SP)
          (i32.add
            (i32.mul (i32.const ${VAR_SIZE}) ${argsPassed})
            (i32.const ${VAR_SIZE})
          )
        )`;
        const curArgLocation = `(i32.sub ${argBase} (i32.const ${
          x * VAR_SIZE
        }))`;

        const finalArgLocation = `(i32.add (global.get $SP) (i32.const ${
          2 * VAR_SIZE
        }))`;

        const returnArrayLocation = `(i32.load (i32.add ${finalArgLocation} (i32.const 4)))`;

        const storeLocation = `(i32.add
          (global.get $FP)
          (i32.const ${FRAME_PROLOGUE_SIZE + x * VAR_SIZE})
        )`;

        const expectedCopy = `(memory.copy
          ${storeLocation}
          ${curArgLocation}
          (i32.const ${VAR_SIZE})
        )`;

        const setToNil = this.setToNil(storeLocation);

        // What parameter are we on

        this.addInstruction(
          `(i32.lt_s (i32.const ${x}) (i32.sub ${argsPassed} (i32.const 1)))`
        );
        // If we aren't on the final arg, or past it
        this.addInstruction("(if (then");
        // Just do a simple memcopy

        this.addInstruction(expectedCopy);
        this.addInstruction(") (else");
        // We are on the final arg or past it
        // Is the final arg a return array?
        this.addInstruction(
          `(i32.eq (i32.load ${finalArgLocation}) (i32.const ${DynamicTypes.RETURNARRAY}))`
        );

        this.addInstruction("(if (then");
        // Final arg is a return array
        this.addInstruction(
          `(i32.gt_s (i32.load ${returnArrayLocation}) (i32.const 0))`
        );
        // If it has remaining elements
        this.addInstruction("(if (then");
        this.addInstruction(`(memory.copy
          ${storeLocation}
          (i32.add
            ${returnArrayLocation}
            (i32.add
              (i32.mul
                (i32.sub
                  (i32.const ${x + 1})
                  ${argsPassed}
                )
                (i32.const ${VAR_SIZE})
              )
              (i32.const 4)
            )
          )
          (i32.const ${VAR_SIZE})
        )`);

        // Decrement count
        this.addInstruction(`(i32.store
          ${returnArrayLocation}
          (i32.sub
            (i32.load ${returnArrayLocation})
            (i32.const 1)
          )
        )`);
        this.addInstruction(") (else");
        this.addInstruction(setToNil);
        this.addInstruction("))");
        this.addInstruction(") (else");
        // Final arg is not a return array
        // If we're on the final arg, copy it, otherwise, set it to nil
        this.addInstruction(`(i32.eq (i32.const ${x + 1}) ${argsPassed})`);
        this.addInstruction("(if (then");
        this.addInstruction(expectedCopy);
        this.addInstruction(") (else");
        this.addInstruction(setToNil);
        this.addInstruction("))");
        this.addInstruction("))");
        this.addInstruction("))");
      }

      // Pop from stack all these values

      // VAR_SIZE * 2 since we need to pop the arg count, the args, and the closure
      this.addInstruction(`(global.set $SP
        (i32.add
          (global.get $SP)
          (i32.add
            (i32.const ${VAR_SIZE * 2})
            (i32.mul
              (i32.const ${VAR_SIZE})
              ${argsPassed}
            )
          )
        )
      )`);

      if (v.customBody) {
        this.addInstruction(v.customBody);
      }
    }
  }

  leaveFunction(v: Function): void {
    // If we hit this point, we've not returned anything.
    // Create size 1 return array containing nil
    // 12 bytes - 4 to indicate size 1, 8 to store nil
    this.alloc(`(i32.const 12)`);
    this.addInstruction(
      `(i32.store (i32.sub (global.get $HP) (i32.const 12)) (i32.const 1))`
    );
    this.addInstruction(
      `(i32.store (i32.sub (global.get $HP) (i32.const 8)) (i32.const ${DynamicTypes.NIL}))`
    );
    this.addInstruction(
      `(i32.store (i32.sub (global.get $HP) (i32.const 4)) (i32.const ${DynamicTypes.NIL}))`
    );
    // Put the returnarray on the stack
    this.putOnStack(
      DynamicTypes.RETURNARRAY,
      `(i32.sub (global.get $HP) (i32.const 12))`
    );
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
      const storeLocation = `(i32.add (global.get $FP) (i32.const ${
        VAR_SIZE * offset + FRAME_PROLOGUE_SIZE
      }))`;

      const stackLocation = `(i32.add
        (i32.const ${(a.values.expressions.length - x) * VAR_SIZE})
        (global.get $SP)
      )`;

      this.assignFromExpList(storeLocation, stackLocation, x, a.values);
    }

    this.popFromStack(a.values.expressions.length);
  }

  assignFromExpList(
    storeLocation: string,
    fetchLocation: string,
    varIndex: number,
    expList: ExpressionList
  ) {
    if (
      varIndex <
      expList.expressions.length - (expList.lastExprIsFunc() ? 1 : 0)
    ) {
      this.addInstruction(`(memory.copy
        ${storeLocation}
        ${fetchLocation}
        (i32.const ${VAR_SIZE})
      )`);
    } else {
      const setToNil = this.setToNil(storeLocation);
      if (!expList.lastExprIsFunc()) {
        this.addInstruction(setToNil);
      } else {
        const returnArrayLocation = `(i32.load
          (i32.add
            (global.get $SP)
            (i32.const 12)
          )
        )`;

        this.addInstruction(
          `(i32.gt_s (i32.load ${returnArrayLocation}) (i32.const 0))`
        );
        this.addInstruction(`(if
          (then
            (memory.copy
              ${storeLocation}
              (i32.add
                (i32.const ${
                  4 + VAR_SIZE * (varIndex - expList.expressions.length + 1)
                })
                ${returnArrayLocation}
              )
              (i32.const ${VAR_SIZE})
            )
            (i32.store
              ${returnArrayLocation}
              (i32.sub
                (i32.load ${returnArrayLocation})
                (i32.const 1)
              )
            )
          )
          (else
            ${setToNil}
          )
        )`);
      }
    }
  }

  leaveAssignment(a: Assignment): void {
    // For something like a, b = 1, 2
    // Stack is set up: 8 bytes for 1,
    // 8 bytes for 2,
    // 8 bytes for mem location of b,
    // 8 bytes for mem location of a

    const expressionSize = a.values.expressions.length * VAR_SIZE;

    for (let x = 0; x < a.lvalues.length; ++x) {
      const storeLocation = `(i32.load
        (i32.add
          (global.get $SP)
          (i32.const ${
            8 + expressionSize + (a.lvalues.length - x - 1) * VAR_SIZE + 4
          })
        )
      )`;
      const stackLocation = `(i32.add
        (i32.const ${8 + (a.values.expressions.length - x - 1) * VAR_SIZE})
        (global.get $SP)
      )`;

      this.assignFromExpList(storeLocation, stackLocation, x, a.values);
    }

    this.popFromStack(a.lvalues.length + a.values.expressions.length);
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
    }
    // If v is a global, it's handled by the field access transformation in scope visitor
  }

  visitWhileStatement(v: WhileStatement): void {
    this.addInstruction(`(block $whileLoop${v.index} (loop`);
  }

  visitBreakStatement(v: BreakStatement): void {
    this.addInstruction(`br $whileLoop${v.whileStatement.index}`);
  }

  leaveReturnStatement(v: ReturnStatement): void {
    // Assume for now that we have all the args on the stack, based on the number of expressions evaluated
    // Allocate space for a returnarray - contains size, then vars
    const funcResultLocation = `(i32.load
      (i32.add
        (global.get $SP)
        (i32.const 12)
      )
    )`;

    let returnObjectSize = `(i32.const ${
      4 + v.expressions.expressions.length * VAR_SIZE
    })`;

    if (v.expressions.lastExprIsFunc()) {
      returnObjectSize = `(i32.add
        (i32.const ${4 + (v.expressions.expressions.length - 1) * VAR_SIZE})
        (i32.mul (i32.const ${VAR_SIZE}) (i32.load ${funcResultLocation}))
      )`;
    }
    this.alloc(returnObjectSize);
    const returnObjectBase = `(i32.sub (global.get $HP) ${returnObjectSize})`;
    this.addInstruction(`(global.set $temp ${returnObjectBase})`);

    let numResults = `(i32.const ${v.expressions.expressions.length})`;
    // Add size to object
    if (v.expressions.lastExprIsFunc()) {
      numResults = `(i32.add (i32.load ${funcResultLocation}) (i32.const ${
        v.expressions.expressions.length - 1
      }))`;
    }
    this.addInstruction(`(i32.store ${returnObjectBase} ${numResults})`);

    // Copy parameters into heap
    // Can't do with one big memory copy, since they're placed on the stack in reverse order.

    for (
      let x = 0;
      x <
      v.expressions.expressions.length -
        (v.expressions.lastExprIsFunc() ? 1 : 0);
      x++
    ) {
      this.addInstruction(
        `(memory.copy
          (i32.add (i32.const ${4 + x * VAR_SIZE}) ${returnObjectBase})
          (i32.add (global.get $SP) (i32.const ${
            VAR_SIZE * (v.expressions.expressions.length - x)
          }))
          (i32.const ${VAR_SIZE})
        )`
      );
    }

    if (v.expressions.lastExprIsFunc()) {
      this.addInstruction(
        `(memory.copy
          (i32.add (i32.const ${
            4 + (v.expressions.expressions.length - 1) * VAR_SIZE
          }) ${returnObjectBase})
          (i32.add ${funcResultLocation} (i32.const 4))
          (i32.mul (i32.const ${VAR_SIZE}) (i32.load ${funcResultLocation}))
        )`
      );
    }

    this.popFromStack(v.expressions.expressions.length);
    this.putOnStack(DynamicTypes.RETURNARRAY, `(global.get $temp)`);
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
      // Assume we're dealing with two strings, otherwise invalid
      // Get lengths of the strings
      this.popFromStack(2);
      const firstStringMemLocation = `(i32.load (i32.add (global.get $SP) (i32.const 4)))`;
      const secondStringMemLocation = `(i32.load (i32.sub (global.get $SP) (i32.const 4)))`;
      const firstStringCharacters = `(i32.load ${firstStringMemLocation})`;
      const secondStringCharacters = `(i32.load ${secondStringMemLocation})`;

      const newStringCharacters = `(i32.add ${firstStringCharacters} ${secondStringCharacters})`;

      // 4 bytes for size at the beginning, plus size of the previous two strings
      // Plus, alignment

      const unAlignedSize = `(i32.add
        (i32.const 4)
        (i32.add ${firstStringCharacters} ${secondStringCharacters})
      )`;

      const newStringSize = `(i32.add ${unAlignedSize} (i32.sub (i32.const 4) (i32.rem_s ${unAlignedSize} (i32.const 4))))`;
      this.alloc(newStringSize);

      const stringBase = `(i32.sub (global.get $HP) ${newStringSize})`;
      this.addInstruction(`(i32.store ${stringBase} ${newStringCharacters})`);
      this.addInstruction(`(memory.copy
        (i32.add (i32.const 4) ${stringBase})
        (i32.add (i32.const 4) ${firstStringMemLocation})
        ${firstStringCharacters}
      )`);
      this.addInstruction(`(memory.copy
        (i32.add
          ${firstStringCharacters}
          (i32.add
            (i32.const 4)
            ${stringBase}
          )
        )
        (i32.add (i32.const 4) ${secondStringMemLocation})
        ${secondStringCharacters}
      )`);
      this.putOnStack(DynamicTypes.STRING, stringBase);
      return;
    }

    if (
      b.operator === Operators.Equality ||
      b.operator === Operators.Inequality
    ) {
      this.popFromStack(2);
      let call = `(call $equals (global.get $SP) (i32.sub (global.get $SP) (i32.const ${VAR_SIZE})))`;
      this.putOnStack(
        DynamicTypes.BOOL,
        b.operator === Operators.Equality ? call : this.negate(call)
      );
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
      `(global.set $SP (i32.add (global.get $SP) (i32.const ${VAR_SIZE})))`
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
    } else if (v.operator === UnaryOperators.Negation) {
      // Assume dealing with an int
      this.addInstruction(`(i32.store
        (i32.add (global.get $SP) (i32.const 12))
        (i32.sub (i32.const 0) (i32.load (i32.add (global.get $SP) (i32.const 12))))
      )`);
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
      `(global.set $SP (i32.sub (global.get $SP) (i32.const ${VAR_SIZE})))`
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
    this.addInstruction(`(call $alloc ${size})`);
  }

  putOnStack(type: DynamicTypes, value: string) {
    // Store number
    this.addInstruction(
      `(i32.store (i32.add (i32.const 4) (global.get $SP)) ${value})`
    );
    this.addInstruction(`(i32.store (global.get $SP) (i32.const ${type}))`);
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

  setToNil(location: string) {
    return `(memory.fill
      ${location}
      (i32.const ${DynamicTypes.NIL})
      (i32.const ${VAR_SIZE})
    )`;
  }

  visitTableNode(v: TableNode): void {
    const startingArrayCapacity = 11;

    const tableBytes = `(i32.const ${HASH_PROLOGUE_SIZE})`;
    const startingHashBytes = `(i32.const ${
      HASH_KVP_SIZE * startingArrayCapacity
    })`;
    // Create an empty table to be placed on the stack
    const wholeSize = `(i32.add ${tableBytes} ${startingHashBytes})`;
    this.alloc(wholeSize);

    const tableBase = `(i32.sub (global.get $HP) ${wholeSize})`;
    const hashBase = `(i32.sub (global.get $HP) ${startingHashBytes})`;
    // Store number of elements is zero
    this.addInstruction(`(i32.store ${tableBase} (i32.const 0))`);
    this.addInstruction(
      `(i32.store (i32.add (i32.const 4) ${tableBase}) (i32.const ${startingArrayCapacity}))`
    );
    this.addInstruction(
      `(i32.store (i32.add (i32.const 8) ${tableBase}) ${hashBase})`
    );
    this.addInstruction(`(memory.fill
      ${hashBase}
      (i32.const 0)
      ${startingHashBytes}
    )`);
    this.putOnStack(DynamicTypes.TABLE, tableBase);
  }

  visitTableNodePostListElements(v: TableNode): void {
    // Assuming there's an integer key on the stack
    const tableLocation = `(i32.add (global.get $SP) (i32.const ${
      VAR_SIZE * (2 + (v.remainingListElements ? 1 : 0) + v.listElements.length)
    }))`;
    // "a", "b", f()
    // v.listElements.length = 2
    // stack looks like table, "a", "b", f(), SP
    for (let x = 0; x < v.listElements.length; x++) {
      const elementToCopyPtr = `(i32.add (global.get $SP) (i32.const ${
        VAR_SIZE *
        (1 + (v.remainingListElements ? 1 : 0) + v.listElements.length - x)
      }))`;
      this.putOnStack(DynamicTypes.INT, `(i32.const ${x + 1})`);
      const intPtr = `(i32.add (global.get $SP) (i32.const ${VAR_SIZE}))`;
      this.addInstruction(
        `(call $hashInsert ${tableLocation} ${intPtr} ${elementToCopyPtr})`
      );
      this.popFromStack(1);
    }

    if (v.remainingListElements) {
      const copiedSoFar = v.listElements.length;

      // return array looks like 2 (size), 2, 3
      // v.listElements.length = 0
      //

      const returnArrayBase = `(i32.load
        (i32.add (global.get $SP) (i32.const 12))
      )`;
      this.addInstruction(`(loop
        (i32.store (global.get $SP) (i32.const ${DynamicTypes.INT}))
        (i32.store
          (i32.add (i32.const 4) (global.get $SP))
          (i32.add
            (i32.const ${copiedSoFar})
            (i32.load ${returnArrayBase})
          )
        )
        (call $hashInsert
          (i32.add
            (global.get $SP)
            (i32.const ${VAR_SIZE * (2 + v.listElements.length)})
          )
          (global.get $SP)
          (i32.add
            (i32.add
              (i32.const 4)
              ${returnArrayBase}
            )
            (i32.mul
              (i32.const ${VAR_SIZE})
              (i32.sub
                (i32.load ${returnArrayBase})
                (i32.const 1)
              )
            )
          )
        )
        (i32.store ${returnArrayBase}
          (i32.sub
            (i32.load ${returnArrayBase})
            (i32.const 1)
          )
        )
        (br_if 0
          (i32.ne
            (i32.load ${returnArrayBase})
            (i32.const 0)
          )
        )
      )`);
    }

    this.popFromStack(
      v.listElements.length + (v.remainingListElements ? 1 : 0)
    );
  }

  visitTableNodePostKVPElement(v: TableNode): void {
    // Stack looks like table, key, value
    this.popFromStack(2);
    this.addInstruction(`(call $hashInsert
      (i32.add (i32.const ${VAR_SIZE}) (global.get $SP))
      (global.get $SP)
      (i32.sub (global.get $SP) (i32.const ${VAR_SIZE}))
    )`);
  }

  leaveFieldAccess(v: FieldAccess): void {
    // Stack looks like table, key variable
    // Want to fetch value from table, put on stack

    // Assume for now that it's a get
    if (v.get) {
      this.popFromStack(1);
      this.addInstruction(`(memory.copy
        (i32.add (global.get $SP) (i32.const ${VAR_SIZE}))
        (i32.add
          (i32.const ${VAR_SIZE})
          (call $hashSearch
            (i32.add
              (global.get $SP)
              (i32.const ${VAR_SIZE})
            )
            (global.get $SP)
          )
        )
        (i32.const ${VAR_SIZE})
      )`);
    } else {
      // Set, want to retrieve a pointer to the location in the table to store the value
      this.popFromStack(2);
      const elementsPtr = `(i32.load (i32.add (i32.const 4) (global.get $SP)))`;
      this.addInstruction(`(i32.store
        ${elementsPtr}
        (i32.add
          (i32.load ${elementsPtr})
          (i32.const 1)
        )
      )`);
      this.addInstruction(`(call $maybeRehash (global.get $SP))`);
      const keyLocation = `(i32.sub (global.get $SP) (i32.const ${VAR_SIZE}))`;
      const kvpLocation = `(call $hashSearch
        (global.get $SP)
        ${keyLocation}
      )`;

      this.addInstruction(`(memory.copy
        ${kvpLocation}
        ${keyLocation}
        (i32.const ${VAR_SIZE})
      )`);

      this.putOnStack(
        DynamicTypes.POINTER,
        `(i32.add
          (i32.const ${VAR_SIZE})
          ${kvpLocation}
        )`
      );
    }
  }
}
