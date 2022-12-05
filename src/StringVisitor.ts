// Accumulates all the strings stored for the data segment
// As well as uses of non local variables, since the global table
// _G is indexed by strings

import Assignment from "./ast/Assignment";
import AstVisitor from "./AstVisitor";
import BinaryOp from "./ast/BinaryOp";
import Block from "./ast/Block";
import BreakStatement from "./ast/BreakStatement";
import ContinueStatement from "./ast/ContinueStatement";
import Expression from "./ast/Expression";
import FuncCall from "./ast/FuncCall";
import Function from "./ast/Function";
import NumberNode from "./ast/NumberNode";
import ReturnStatement from "./ast/ReturnStatement";
import StringNode from "./ast/StringNode";
import Variable from "./ast/Variable";
import BooleanNode from "./ast/BooleanNode";
import IfStatement from "./ast/IfStatement";
import NilNode from "./ast/NilNode";
import UnaryOp from "./ast/UnaryOp";
import WhileStatement from "./ast/WhileStatement";
import Repeat from "./ast/Repeat";
import NumericFor from "./ast/NumericFor";

export default class StringVisitor extends AstVisitor {
  stringList = [];
  constructor() {
    super();
  }
}
