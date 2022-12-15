import * as fs from "fs";
import antlr4 from "antlr4";
import LuaLexer from "./antlr/LuaLexer.js";
import LuaParser from "./antlr/LuaParser.js";
import AntlrVisitor from "./AntlrVisitor.js";
import CodeGeneration from "./CodeGeneration.js";
import Function from "./ast/Function.js";
import Block from "./ast/Block.js";
import Assignment from "./ast/Assignment.js";
import Variable from "./ast/Variable.js";
import ExpressionList from "./ast/ExpressionList.js";
import ScopeVisitor from "./ScopeVisitor.js";
import StringVistor from "./StringVisitor.js";
import IndexVisitor from "./IndexVisitor.js";

import { FRAME_PROLOGUE_SIZE } from "./constants.js";

// Read a file, generate a parse tree through ANTLR
let input = fs
  .readFileSync(process.argv[2] ?? "testPrograms/simplePrint.lua")
  .toString();

input =
  `
  local _G = {}
  _G._G = _G
local function ipairs(a)
  local function iter(a, i)
    i = i + 1
    local v = a[i]
    if v then
      return i, v
    end
  end
  return iter, a, 0
end
` + input;

const chars = new antlr4.InputStream(input);
const lexer = new LuaLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new LuaParser(tokens);
parser.buildParseTrees = true;
const tree = parser.chunk();

// Construct my ast from the parse tree
const ast = new Function([], tree.accept(new AntlrVisitor()));

// Print allows one field at a time
const printFunction = new Function(["x"], new Block([]));

printFunction.customBody = `
  (call $print (i32.add (global.get $FP) (i32.const ${FRAME_PROLOGUE_SIZE})))
`;

ast.body.statements.splice(
  1,
  0,
  new Assignment([new Variable("print")], new ExpressionList([printFunction]))
);

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
