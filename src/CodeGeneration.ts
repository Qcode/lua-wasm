import Function from "./ast/Function";
import CodeVisitor, { DynamicTypes } from "./CodeVisitor.js";

export default class CodeGeneration {
  stringLocationMap: Map<string, number>;

  constructor() {
    this.stringLocationMap = new Map();
  }

  nearestPrime() {
    // Given an a number, finds the next highest prime
    // cd = candidate divisor
    return `(func $nearestPrime (param $n i32) (result i32)
      (local $cd i32)
      (loop $notPrime
        ;; Increment n by 1
        (local.set $n (i32.add (local.get $n) (i32.const 1)))
        ;; Reset candidate divisor
        (local.set $cd (i32.const 1))
        (block $foundPrime
          (loop $nextCd
            (local.set $cd (i32.add (local.get $cd) (i32.const 1)))
            ;; If our candidate divisor divides evenly into n, then n is composite
            (i32.rem_s (local.get $n) (local.get $cd))
            i32.const 0
            i32.eq
            ;; So go to the next n
            br_if $notPrime

            ;; If candidate divisor is n-1, we've checked all possible divisors, we're good
            (i32.eq (local.get $cd) (i32.sub (local.get $n) (i32.const 1)))
            br_if $foundPrime
            ;; Otherwise, look at next candidate divisor
            br $nextCd
          )
        )
        (return (local.get $n))
      )
      ;; Cannot get here
      unreachable
    )`;
  }

  equals() {
    // If the types are not the same
    return `(func $equals (param $lhs i32) (param $rhs i32) (result i32)
    (local $lhsStringPtr i32) (local $rhsStringPtr i32) (local $i i32)

      ;; If the types are different, return false
      (i32.ne
        (i32.load (local.get $lhs))
        (i32.load (local.get $rhs))
      )
      (if (then (return (i32.const 0))))
      ;; If the types not a string, just compare the pointer/int/bool/nil value
      (i32.ne
        (i32.load (local.get $lhs))
        (i32.const ${DynamicTypes.STRING})
      )
      (if (then (return
        (i32.eq
          (i32.load (i32.add (i32.const 4) (local.get $lhs)))
          (i32.load (i32.add (i32.const 4) (local.get $rhs)))
        )
      )))
      ;; Otherwise, must compare strings
      (local.set $lhsStringPtr (i32.load (i32.add (i32.const 4) (local.get $lhs))))
      (local.set $rhsStringPtr (i32.load (i32.add (i32.const 4) (local.get $rhs))))
      ;; If the strings are of different length, return false
      (i32.ne (i32.load (local.get $lhsStringPtr)) (i32.load (local.get $rhsStringPtr)))
      (if (then
        (return (i32.const 0))
      ))

      (local.set $i (i32.const 4))
      ;; Must compare each of the lengths
      (loop
        (i32.ne
          (i32.load
            (i32.add
              (local.get $lhsStringPtr)
              (local.get $i)
            )
          )
          (i32.load
            (i32.add
              (local.get $rhsStringPtr)
              (local.get $i)
            )
          )
        )
        ;; If the characters aren't the same return 0
        (if (then (return (i32.const 0))))
        ;; Increment i
        (local.set $i (i32.add (local.get $i) (i32.const 4)))
        ;; Loop if i less than string length
        (br_if
          0
          (i32.lt_s
            (i32.sub (local.get $i) (i32.const 4))
            (i32.load (local.get $lhsStringPtr))
          )
        )
      )

      (return (i32.const 1))
    )`;
  }

  generateCode(ast: Function, functions: Function[], strings: string[]) {
    const { stringData, offset } = this.layoutStrings(strings);
    const prologue = `(module
    (func $print (import "imports" "print") (param i32))
    (import "js" "mem" (memory 1))
    (type $basicFunc (func))
    ${stringData}
    (global $HP (mut i32) (i32.const ${offset}))
    (global $FP (mut i32) (i32.const ${offset}))
    (global $SP (mut i32) (i32.const 65528))
    (global $temp (mut i32) (i32.const 0))
    ${this.equals()}
    ${this.nearestPrime()}
    (table ${functions.length} funcref)
    (elem (i32.const 0) ${functions.reduce(
      (acc, fn) => acc + `$f${fn.index} `,
      ""
    )})`;

    const codeVisitor = new CodeVisitor(
      functions,
      this.stringLocationMap,
      offset
    );
    ast.accept(codeVisitor);

    const funcs = codeVisitor.functionWasms.reduce(
      (acc, cur) => acc + "\n" + this.prettify(cur),
      ""
    );

    return prologue + funcs + ")";
  }

  layoutStrings(strings: string[]): { stringData: string; offset: number } {
    let stringLocation = 0;

    const stringData = strings.reduce((acc, string) => {
      this.stringLocationMap.set(string, stringLocation);
      // Add 4 to account for storing the length of the string
      stringLocation += 4;
      acc += `(data (i32.const ${stringLocation}) "${string}")\n`;
      stringLocation += string.length + (4 - (string.length % 4));
      return acc;
    }, "");

    return {
      stringData,
      offset: stringLocation,
    };
  }

  prettify(functionWasm: string) {
    let toReturn: string = "";
    let indent = 0;
    functionWasm.split("\n").forEach((line) => {
      const noWS = line.trim();
      toReturn += " ".repeat(indent) + noWS + "\n";
      indent += (noWS.match(/\(/g) || []).length;
      indent -= (noWS.match(/\)/g) || []).length;
    });
    return toReturn;
  }
}
