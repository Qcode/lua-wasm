import * as fs from "fs";
import antlr4 from "antlr4";
import LuaLexer from "./antlr/LuaLexer.js";
import LuaParser from "./antlr/LuaParser.js";
import AntlrVisitor from "./AntlrVisitor.js";
import CodeGeneration from "./CodeGeneration.js";
import Function from "./ast/Function.js";
import ScopeVisitor from "./ScopeVisitor.js";
import StringVistor from "./StringVisitor.js";
import IndexVisitor from "./IndexVisitor.js";

// Read a file, generate a parse tree through ANTLR
const input = fs
  .readFileSync(process.argv[2] ?? "testPrograms/concatenation.lua")
  .toString();
const chars = new antlr4.InputStream(input);
const lexer = new LuaLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new LuaParser(tokens);
parser.buildParseTrees = true;
const tree = parser.chunk();

// Construct my ast from the parse tree
const ast = new Function([], tree.accept(new AntlrVisitor()));

// Annotate blocks with local variables
// Determine if variable uses are global or local, etc
ast.accept(new ScopeVisitor());

const stringVisitor = new StringVistor();
ast.accept(stringVisitor);

const indexVisitor = new IndexVisitor();
ast.accept(indexVisitor);

// Generate code, output it
const codeOutput = new CodeGeneration().generateCode(
  ast,
  indexVisitor.functions,
  Array.from(stringVisitor.strings)
);

console.log(codeOutput);
