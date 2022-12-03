import * as fs from "fs";
import antlr4 from "antlr4";
import LuaLexer from "./antlr/LuaLexer.js";
import LuaParser from "./antlr/LuaParser.js";
import LuaListener from "./antlr/LuaListener.js";
import TreeVisitor from "./AntlrVisitor.js";
import Block from "./ast/Block.js";
import CodeGeneration from "./CodeGeneration.js";
import BlockVariableDeclVisitor from "./BlockVariableDeclVisitor.js";

const input = fs
  .readFileSync(process.argv[2] ?? "testPrograms/test.lua")
  .toString();
const chars = new antlr4.InputStream(input);
const lexer = new LuaLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new LuaParser(tokens);
parser.buildParseTrees = true;
const tree = parser.chunk();

const stringLookup = {};

/*class PreProcessor extends LuaListener {
  #stringOffset = 0;

  enterString(ctx) {
    const string = ctx.getText();
    this.addToStringLookup(string.substring(1, string.length - 1));
  }

  enterVar(ctx) {
    this.addToStringLookup(ctx.getText());
  }

  addToStringLookup(string) {
    if (!(string in stringLookup)) {
      stringLookup[string] = this.#stringOffset;
      this.#stringOffset += string.length;
    }
  }
}

class CodeGenerator extends LuaListener {
  generatedCode = [];
  #heapPointer;

  constructor() {
    super();
  }

  // Chunk defines the beginning of the grammar, so here we create
  enterChunk(ctx) {
    this.generatedCode.push("(module");
    this.generatedCode.push('(import "js" "mem" (memory 1))');
    let largestOffset = 0;
    Object.entries(stringLookup).forEach(([string, offset]) => {
      this.generatedCode.push(`(data (i32.const ${offset}) ${string})`);
      if (offset + string.length > largestOffset)
        largestOffset = offset + string.length;
    });
    this.#heapPointer = largestOffset + 4 - (largestOffset % 4);
    console.log(this.#heapPointer);
    this.generatedCode.push('(func (export "main")');
    this.generatedCode.push(
      `(i32.store (i32.const ${this.#heapPointer}) (i32.const ${
        this.#heapPointer + 4
      })`
    );
  }

  // All that's left to do is close the module

  exitChunk(ctx) {
    this.generatedCode.push(")");
  }

  enterStat(ctx) {}

  enterNumber(ctx) {}
}*/

const treeVisitor = new TreeVisitor();
// Construct my ast from the parse tree
const ast = tree.accept(treeVisitor);
ast.accept(new BlockVariableDeclVisitor());

console.log(JSON.stringify(ast, null, 2));
const codeOutput = new CodeGeneration().generateCode(ast);
console.log(codeOutput);

/*const preprocessor = new PreProcessor();
const listener = new CodeGenerator();

antlr4.tree.ParseTreeWalker.DEFAULT.walk(preprocessor, tree);
antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);

console.log(listener.generatedCode);*/
