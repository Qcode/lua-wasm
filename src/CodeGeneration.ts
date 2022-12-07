import Function from "./ast/Function";
import CodeVisitor from "./CodeVisitor.js";

export default class CodeGeneration {
  stringLocationMap: Map<string, number>;

  constructor() {
    this.stringLocationMap = new Map();
  }

  generateCode(ast: Function, functions: Function[], strings: string[]) {
    const { stringData, offset } = this.layoutStrings(strings);
    const prologue = `(module
    (func $printNum (import "imports" "printNum") (param i32))
    (func $printString (import "imports" "printString") (param i32))
    (import "js" "mem" (memory 1))
    ${stringData}
    (global $hp (mut i32) (i32.const ${offset}))
    (global $fp (mut i32) (i32.const ${offset}))
    (global $SP (mut i32) (i32.const 65528))
    (table ${functions.length} funcref)
    (elem (i32.const 0) ${functions.reduce(
      (acc, fn) => acc + `$f${fn.index}`,
      ""
    )})`;

    const codeVisitor = new CodeVisitor(functions, this.stringLocationMap);
    ast.accept(codeVisitor);

    const funcs = codeVisitor.functionWasms.reduce(
      (acc, cur) => acc + "\n" + cur,
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
}
