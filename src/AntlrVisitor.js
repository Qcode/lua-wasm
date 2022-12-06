import LuaParser from "./antlr/LuaParser.js";
import Block from "./ast/Block.js";
import Variable from "./ast/Variable.js";
import Assignment from "./ast/Assignment.js";
import NumberNode from "./ast/NumberNode.js";
import BinaryOp from "./ast/BinaryOp.js";
import StringNode from "./ast/StringNode.js";
import FuncCall from "./ast/FuncCall.js";
import Function from "./ast/Function.js";
import ReturnStatement from "./ast/ReturnStatement.js";
import IfStatement from "./ast/IfStatement.js";
import BooleanNode from "./ast/BooleanNode.js";
import NilNode from "./ast/NilNode.js";
import UnaryOp from "./ast/UnaryOp.js";
import WhileStatement from "./ast/WhileStatement.js";
import Repeat from "./ast/Repeat.js";
import NumericFor from "./ast/NumericFor.js";
import LocalAssignment from "./ast/LocalAssignment.js";

// Transforms the tree from just being an ANTLR parse tree into an AST
// defined by my own classes which is easier to manipulate
export default class AntlrVisitor {
  visitChildren(ctx) {
    if (!ctx) {
      return;
    }
    if (ctx instanceof LuaParser.StatNumericForContext) {
      return new NumericFor(
        new Variable(ctx.getChild(1).getText()),
        ctx.block().accept(this),
        ctx.getChild(3).accept(this),
        ctx.getChild(5).accept(this),
        ctx.getChildCount() === 10 ? ctx.getChild(7).accept(this) : null
      );
    }

    if (ctx instanceof LuaParser.StatRepeatContext) {
      return new Repeat(ctx.exp().accept(this), ctx.block().accept(this));
    }

    if (ctx instanceof LuaParser.StatDoContext) {
      return ctx.block().accept(this);
    }

    if (ctx instanceof LuaParser.StatWhileContext) {
      return new WhileStatement(
        ctx.exp().accept(this),
        ctx.block().accept(this)
      );
    }

    if (ctx instanceof LuaParser.ExpUnaryContext) {
      return new UnaryOp(ctx.exp().accept(this), ctx.getChild(0).getText());
    }

    if (ctx instanceof LuaParser.StatIfContext) {
      const conditions = [ctx.getChild(1).accept(this)];
      const blocks = [ctx.getChild(3).accept(this)];
      for (let x = 4; x < ctx.getChildCount(); x++) {
        if (ctx.getChild(x).getText() === "elseif") {
          conditions.push(ctx.getChild(x + 1).accept(this));
          blocks.push(ctx.getChild(x + 3).accept(this));
        } else if (ctx.getChild(x).getText() === "else") {
          blocks.push(ctx.getChild(x + 1).accept(this));
        }
      }
      return new IfStatement(conditions, blocks);
    }

    if (
      ctx instanceof LuaParser.ExpTrueContext ||
      ctx instanceof LuaParser.ExpFalseContext
    ) {
      return new BooleanNode(ctx.getText() === "true");
    }

    if (ctx instanceof LuaParser.ExpNilContext) {
      return new NilNode();
    }

    if (ctx instanceof LuaParser.ExpNumberContext) {
      return new NumberNode(ctx.getText());
    }

    if (ctx instanceof LuaParser.ExpStringContext) {
      return new StringNode(ctx.getText());
    }

    if (ctx instanceof LuaParser.ChunkContext) {
      return ctx.getChild(0).accept(this);
    }

    if (ctx instanceof LuaParser.ReturnStatContext) {
      return new ReturnStatement(
        ctx.explist() ? ctx.explist().accept(this) : []
      );
    }

    if (ctx instanceof LuaParser.BlockContext) {
      const lastStmt = ctx.laststat() ? ctx.laststat().accept(this) : null;
      const bodyStmts = (
        ctx.laststat() ? ctx.children.slice(0, -1) : ctx.children
      ).map((child) => child.accept(this));
      return new Block(bodyStmts, lastStmt);
    }

    if (ctx instanceof LuaParser.VarContext) {
      return new Variable(ctx.getText());
    }

    if (ctx instanceof LuaParser.NamelistContext) {
      const results = [];
      for (let x = 0; x < ctx.getChildCount(); x += 2) {
        results.push(ctx.getChild(x).getText());
      }
      return results;
    }

    if (
      ctx instanceof LuaParser.ExplistContext ||
      ctx instanceof LuaParser.VarlistContext
    ) {
      const results = [];
      // += 2 in this case, because every other variable is a comma
      for (let x = 0; x < ctx.getChildCount(); x += 2) {
        results.push(ctx.getChild(x).accept(this));
      }
      return results;
    }

    if (ctx instanceof LuaParser.StatLocalAssignmentContext) {
      return new LocalAssignment(
        ctx.getChild(1).accept(this),
        ctx.getChildCount() >= 3 ? ctx.getChild(3).accept(this) : []
      );
    }

    if (ctx instanceof LuaParser.StatAssignmentContext) {
      return new Assignment(
        ctx.getChild(0).accept(this),
        ctx.getChild(2).accept(this)
      );
    }

    if (ctx instanceof LuaParser.FunccallContext) {
      const functionCallNode = ctx.functioncall();
      // TODO: Something like f returns another function, f()() - multiple args, need to nest FuncCall Objects
      // nameAndArgs => args => explist
      const myArgs = functionCallNode.nameAndArgs()[0].args();
      return new FuncCall(
        functionCallNode.varOrExp().accept(this),
        myArgs.explist() ? myArgs.explist().accept(this) : []
      );
    }

    if (ctx instanceof LuaParser.ParlistContext) {
      return ctx.namelist().accept(this);
    }

    if (ctx instanceof LuaParser.FuncbodyContext) {
      const parameters =
        ctx.getChild(1) instanceof LuaParser.ParlistContext
          ? ctx.parlist().accept(this)
          : [];
      return new Function(parameters, ctx.block().accept(this));
    }

    if (ctx instanceof LuaParser.ExpFuncDefContext) {
      return ctx.functiondef().funcbody().accept(this);
    }

    if (ctx instanceof LuaParser.StatFuncDeclarationContext) {
      // Handle functions in tables later
      return new Assignment(
        [new Variable(ctx.funcname().getText())],
        [ctx.getChild(2).accept(this)]
      );
    }

    if (ctx instanceof LuaParser.StatLocalfuncDeclarationContext) {
      return new LocalAssignment(
        [ctx.NAME().getText()],
        [ctx.funcbody().accept(this)]
      );
    }

    if (
      ctx instanceof LuaParser.ExpPowerContext ||
      ctx instanceof LuaParser.ExpMulDivModContext ||
      ctx instanceof LuaParser.ExpAddSubContext ||
      ctx instanceof LuaParser.ExpConcatContext ||
      ctx instanceof LuaParser.ExpComparisonContext ||
      ctx instanceof LuaParser.ExpAndContext ||
      ctx instanceof LuaParser.ExpOrContext
    ) {
      return new BinaryOp(
        ctx.getChild(0).accept(this),
        ctx.getChild(2).accept(this),
        ctx.getChild(1).getText()
      );
    }

    if (ctx instanceof LuaParser.VarOrExpContext) {
      if (ctx.var_() !== null) {
        return ctx.var_().accept(this);
      } else {
        return ctx.exp().accept(this);
      }
    }

    if (ctx instanceof LuaParser.PrefixexpContext) {
      if (ctx.getChildCount() == 1) {
        return ctx.varOrExp().accept(this);
      } else {
        // Function call
      }
    }

    if (ctx instanceof LuaParser.ExpPrefixExpContext) {
      return ctx.prefixexp().accept(this);
    }

    throw `${ctx.getText()} is not supported`;
  }
  visitTerminal(terminal) {
    console.log(terminal.getText());
  }
}
