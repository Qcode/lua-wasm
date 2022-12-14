import Function from "./ast/Function";
import CodeVisitor, { DynamicTypes } from "./CodeVisitor.js";
import { HASH_KVP_SIZE, VAR_SIZE } from "./constants.js";

export default class CodeGeneration {
  stringLocationMap: Map<string, number>;

  constructor() {
    this.stringLocationMap = new Map();
  }

  hashKey() {
    return `(func $hashKey (param $keyptr i32) (param $modulus i32) (result i32)
      (local $stringLocation i32) (local $stringCharacters i32) (local $stringResult i32) (local $loopParam i32)
      (local $curChar i32)
      (i32.ne (i32.load (local.get $keyptr)) (i32.const ${DynamicTypes.STRING}))
      (if (then (return
        (i32.rem_s
          (i32.load
            (i32.add
              (i32.const 4)
              (local.get $keyptr)
            )
          )
          (local.get $modulus)
        )
      )))
      ;; Hashing string requires more complex approach

      (local.set $stringLocation (i32.load (i32.add (i32.const 4) (local.get $keyptr))))

      (local.set
        $stringCharacters
        (i32.load (local.get $stringLocation))
      )
      (local.set $loopParam (i32.const 0))
      (local.set $stringResult (i32.const 0))
      (loop
        (local.set $curChar
          (i32.load8_u
            (i32.add
              (local.get $stringLocation)
              (i32.add (local.get $loopParam) (i32.const 4))
            )
          )
        )

        (local.set $stringResult
          (i32.rem_s
            (i32.add
              (local.get $stringResult)
              (i32.mul
                (local.get $curChar)
                (i32.const 257)
              )
            )
            (local.get $modulus)
          )
        )

        (local.set $loopParam
          (i32.add
            (local.get $loopParam)
            (i32.const 1)
          )
        )
        (br_if
          0
          (i32.lt_s
            (local.get $loopParam)
            (local.get $stringCharacters)
          )
        )
      )
      (local.get $stringResult)
    )`;
  }

  // Most inserts come from an assignment - which involves fetching a ptr, then setting it
  // On the other hand, gets should do the exact same code, but no need for resize checks

  hashSearchArray() {
    return `
    (func $hashSearchArray (param $hashArrayBase i32) (param $hashSize i32) (param $keyPtr i32) (result i32)
    (local $hashIndex i32) (local $kvpPtr i32)

    (local.set $hashIndex (call $hashKey (local.get $keyPtr) (local.get $hashSize)))

    ;; Do linear probing

    (loop
      (local.set $kvpPtr
        (i32.add
          (local.get $hashArrayBase)
          (i32.mul (local.get $hashIndex) (i32.const ${HASH_KVP_SIZE}))
        )
      )
      ;; If the key is nil, can place there
      (if
        (i32.eq
          (i32.load (local.get $kvpPtr))
          (i32.const ${DynamicTypes.NIL})
        )
        (then
          (return (local.get $kvpPtr))
        )
      )
      ;; If the key matches, we've found it
      (if
        (call $equals
          (local.get $kvpPtr)
          (local.get $keyPtr)
        )
        (then (return (local.get $kvpPtr)))
      )
      ;; Otherwise, increment
      (local.set $hashIndex
        (i32.rem_s
          (i32.add
            (local.get $hashIndex)
            (i32.const 1)
          )
          (local.get $hashSize)
        )
      )
      br 0
    )

    unreachable)`;
  }

  hashSearch() {
    // Returns a mem location in the hash table to put the key value pair
    return `(func $hashSearch (param $tablePtr i32) (param $keyPtr i32) (result i32)
    (local $hashArrayBase i32) (local $hashSize i32)

    (local.set $hashArrayBase
      (i32.load
        (i32.add
          (i32.const 8)
          (i32.load
            (i32.add (i32.const 4) (local.get $tablePtr))
          )
        )
      )
    )

    (local.set $hashSize
      (i32.load
        (i32.add
          (i32.const 4)
          (i32.load
            (i32.add
              (i32.const 4)
              (local.get $tablePtr)
            )
          )
        )
      )
    )

    (call $hashSearchArray (local.get $hashArrayBase) (local.get $hashSize) (local.get $keyPtr))
    )`;
  }

  maybeRehash() {
    return `(func $maybeRehash (param $tablePtr i32)
      (local $numElementsPtr i32)
      (local $capacityPtr i32)

      (local.set $numElementsPtr (i32.load (i32.add (local.get $tablePtr) (i32.const 4))))
      (local.set $capacityPtr (i32.add (i32.const 4) (local.get $numElementsPtr)))

      (if
        (i32.gt_s
          (i32.load (local.get $numElementsPtr))
          (i32.div_s (i32.load (local.get $capacityPtr)) (i32.const 2))
        )
        (then
          (call $rehash (local.get $tablePtr))
        )
      )
    )`;
  }

  hashInsert() {
    return `(func $hashInsert (param $tablePtr i32) (param $keyPtr i32) (param $valuePtr i32)
      (local $kvpPtr i32)
      (local $numElementsPtr i32)
      (local $capacityPtr i32)

      (local.set $numElementsPtr (i32.load (i32.add (local.get $tablePtr) (i32.const 4))))
      (local.set $capacityPtr (i32.add (i32.const 4) (local.get $numElementsPtr)))

      (i32.store (local.get $capacityPtr) (i32.add (i32.load (local.get $capacityPtr)) (i32.const 1)))


      (call $maybeRehash (local.get $tablePtr))

      (local.set $kvpPtr
        (call $hashSearch
          (local.get $tablePtr)
          (local.get $keyPtr)
        )
      )

      (memory.copy
        (local.get $kvpPtr)
        (local.get $keyPtr)
        (i32.const ${VAR_SIZE})
      )

      (memory.copy
        (i32.add (i32.const ${VAR_SIZE}) (local.get $kvpPtr))
        (local.get $valuePtr)
        (i32.const ${VAR_SIZE})
      )
    )`;
  }

  rehash() {
    return `(func $rehash (param $tablePtr i32)
      (local $currentHashCapacity i32) (local $newHashArrayBytes i32) (local $loopParam i32)
      (local $elementsInserted i32)
      (local $hashTableBase i32)
      (local $oldHashArrayPtr i32)
      (local $kvpPtr i32)
      (local $newHashCapacity i32) (local $newHashArrayPtr i32)

      (local.set $hashTableBase
        (i32.load (i32.add (i32.const 4) (local.get $tablePtr)))
      )
      (local.set $currentHashCapacity
        (i32.load
          (i32.add
            (i32.const 4)
            (local.get $hashTableBase)
          )
        )
      )

      (local.set $newHashCapacity
        (call $nearestPrime
          (i32.mul
            (i32.const 2)
            (local.get $currentHashCapacity)
          )
        )
      )

      (local.set $newHashArrayBytes (i32.mul (local.get $newHashCapacity) (i32.const ${HASH_KVP_SIZE})))

      (call $alloc (local.get $newHashArrayBytes))
      (local.set $newHashArrayPtr (i32.sub (global.get $HP) (local.get $newHashArrayBytes)))
      (local.set $oldHashArrayPtr (i32.load (i32.add (local.get $hashTableBase) (i32.const 8))))

      (local.set $elementsInserted (i32.const 0))
      (local.set $loopParam (i32.const 0))
      (loop
        (local.set $kvpPtr (i32.add (local.get $oldHashArrayPtr) (i32.mul (i32.const ${HASH_KVP_SIZE}) (local.get $loopParam))))
        (if
          ;; If the key isn't nil, and the value isn't nil, insert it
          (i32.and
            (i32.ne
              (i32.load (local.get $kvpPtr))
              (i32.const ${DynamicTypes.NIL})
            )
            (i32.ne
              (i32.load (i32.add (i32.const ${VAR_SIZE}) (local.get $kvpPtr)))
              (i32.const ${DynamicTypes.NIL})
            )
          )
          (then
            (memory.copy
              (call $hashSearchArray (local.get $newHashArrayPtr) (local.get $newHashCapacity) (local.get $kvpPtr))
              (local.get $kvpPtr)
              (i32.const ${HASH_KVP_SIZE})
            )
            (local.set $elementsInserted (i32.add (local.get $elementsInserted) (i32.const 1)))
          )
        )

        (local.set $loopParam (i32.add (local.get $loopParam) (i32.const 1)))
        (br_if 0 (i32.lt_s (local.get $loopParam) (local.get $currentHashCapacity)))
      )

      (i32.store (local.get $hashTableBase) (local.get $elementsInserted))
      (i32.store (i32.add (i32.const 4) (local.get $hashTableBase)) (local.get $newHashCapacity))
      (i32.store (i32.add (i32.const 8) (local.get $hashTableBase)) (local.get $newHashArrayPtr))
    )`;
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

  alloc() {
    return `(func $alloc (param $bytes i32)
      (global.set $HP
        (i32.add
          (global.get $HP)
          (local.get $bytes)
        )
      )
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
    ${this.hashInsert()}
    ${this.hashSearchArray()}
    ${this.hashSearch()}
    ${this.hashKey()}
    ${this.rehash()}
    ${this.maybeRehash()}
    ${this.alloc()}
    (table ${functions.length} funcref)
    (elem (i32.const 0) ${functions.reduce(
      (acc, fn) => acc + `$f${fn.index} `,
      ""
    )})`;

    const codeVisitor = new CodeVisitor(functions, this.stringLocationMap);
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
