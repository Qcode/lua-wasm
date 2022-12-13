import LuaParser from "./antlr/LuaParser.js";
import Block from "./ast/Block.js";
import Variable from "./ast/Variable.js";
import Assignment from "./ast/Assignment.js";
import NumberNode from "./ast/NumberNode.js";
import BinaryOp, { Operators as BinaryOperators } from "./ast/BinaryOp.js";
import StringNode from "./ast/StringNode.js";
import FuncCall from "./ast/FuncCall.js";
import Function from "./ast/Function.js";
import ReturnStatement from "./ast/ReturnStatement.js";
import IfStatement from "./ast/IfStatement.js";
import BooleanNode from "./ast/BooleanNode.js";
import NilNode from "./ast/NilNode.js";
import UnaryOp, { Operators } from "./ast/UnaryOp.js";
import WhileStatement from "./ast/WhileStatement.js";
import LocalAssignment from "./ast/LocalAssignment.js";
import BreakStatement from "./ast/BreakStatement.js";
import { v4 as uuid } from "uuid";
import ExpressionList from "./ast/ExpressionList.js";
import TableNode from "./ast/TableNode.js";
import FieldAccess from "./ast/FieldAccess.js";

// Transforms the tree from just being an ANTLR parse tree into an AST
// defined by my own classes which is easier to manipulate
export default class AntlrVisitor {
  visitChildren(ctx) {
    if (!ctx) {
      return;
    }
    if (ctx instanceof LuaParser.ExpTableCtorContext) {
      return ctx.tableconstructor().accept(this);
    }

    if (ctx instanceof LuaParser.TableconstructorContext) {
      if (!ctx.fieldlist()) {
        return new TableNode([], new Map(), null);
      }
      const listElements = [];
      const initializeWith = new Map();
      let remainingListElements = null
      const fieldList = ctx.fieldlist();
      for (let x = 0; x < fieldList.getChildCount(); x++) {
        const field = fieldList.getChild(x);
        if (field instanceof LuaParser.FieldContext) {
          if (field.getChild(0).getText() === "[") {
            initializeWith.set(field.getChild(1).accept(this)) = field.getChild(4).accept(this);
          } else if (field.getChildCount() === 1) {
            listElements.push(field.getChild(0).accept(this))
          } else {
            initializeWith.set(new StringNode(field.NAME().getText()), field.getChild(2).accept(this));
          }
        }
      }
      if (listElements[listElements.length - 1] instanceof FuncCall) {
        remainingListElements = listElements.pop();
      }
      return new TableNode(listElements, initializeWith, remainingListElements);
    }

    if (ctx instanceof LuaParser.StatNumericForContext) {
      // Transform the Numeric For loop into a while loop as specified in
      // the Lua 5.3 reference manual
      const varName = uuid();
      const limitName = uuid();
      const stepName = uuid();

      return new Block([
        new LocalAssignment(
          [varName, limitName, stepName],
          new ExpressionList([
            ctx.getChild(3).accept(this),
            ctx.getChild(5).accept(this),
            ctx.getChildCount() === 11
              ? ctx.getChild(7).accept(this)
              : new NumberNode(1),
          ])
        ),
        new Assignment(
          [new Variable(varName)],
          new ExpressionList([
            new BinaryOp(
              new Variable(varName),
              new Variable(stepName),
              BinaryOperators.Sub
            ),
          ])
        ),
        new WhileStatement(
          new BooleanNode(true),
          new Block([
            new Assignment(
              [new Variable(varName)],
              new ExpressionList([
                new BinaryOp(
                  new Variable(varName),
                  new Variable(stepName),
                  BinaryOperators.Add
                ),
              ])
            ),
            new IfStatement(
              new BinaryOp(
                new BinaryOp(
                  new BinaryOp(
                    new Variable(stepName),
                    new NumberNode(0),
                    BinaryOperators.Geq
                  ),
                  new BinaryOp(
                    new Variable(varName),
                    new Variable(limitName),
                    BinaryOperators.Gt
                  ),
                  BinaryOperators.And
                ),
                new BinaryOp(
                  new BinaryOp(
                    new Variable(stepName),
                    new NumberNode(0),
                    BinaryOperators.Lt
                  ),
                  new BinaryOp(
                    new Variable(varName),
                    new Variable(limitName),
                    BinaryOperators.Lt
                  ),
                  BinaryOperators.And
                ),
                BinaryOperators.Or
              ),
              new Block([], new BreakStatement())
            ),
            new LocalAssignment(
              [ctx.getChild(1).getText()],
              new ExpressionList([new Variable(varName)])
            ),
            ctx.block().accept(this),
          ])
        ),
      ]);
    }

    if (ctx instanceof LuaParser.StatGenericForContext) {
      const fName = uuid();
      const sName = uuid();
      const varName = uuid();

      const nameList = ctx.namelist().accept(this);
      return new Block([
        new LocalAssignment(
          [fName, sName, varName],
          ctx.explist().accept(this)
        ),
        new WhileStatement(
          new BooleanNode(true),
          new Block([
            new LocalAssignment(
              nameList,
              new ExpressionList([
                new FuncCall(
                  new Variable(fName),
                  new ExpressionList([
                    new Variable(sName),
                    new Variable(varName),
                  ])
                ),
              ])
            ),
            new IfStatement(
              new BinaryOp(
                new Variable(nameList[0]),
                new NilNode(),
                BinaryOperators.Equality
              ),
              new Block([], new BreakStatement())
            ),
            new Assignment(
              [new Variable(varName)],
              new ExpressionList([new Variable(nameList[0])])
            ),
            ctx.block().accept(this),
          ])
        ),
      ]);
    }

    if (ctx instanceof LuaParser.StatRepeatContext) {
      return new Block([
        ctx.block().accept(this),
        new WhileStatement(
          new UnaryOp(ctx.exp().accept(this), Operators.Not),
          ctx.block().accept(this)
        ),
      ]);
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
      const condition = ctx.getChild(1).accept(this);
      const thenBlock = ctx.getChild(3).accept(this);
      let currentIfStatement = new IfStatement(condition, thenBlock);
      const headIfStatement = currentIfStatement;

      for (let x = 4; x < ctx.getChildCount(); x++) {
        if (ctx.getChild(x).getText() === "elseif") {
          const newIfStatement = new IfStatement(
            ctx.getChild(x + 1).accept(this),
            ctx.getChild(x + 3).accept(this)
          );
          currentIfStatement.elseBlock = new Block([newIfStatement]);
          currentIfStatement = newIfStatement;
        } else if (ctx.getChild(x).getText() === "else") {
          currentIfStatement.elseBlock = ctx.getChild(x + 1).accept(this);
        }
      }
      return headIfStatement;
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
        ctx.explist() ? ctx.explist().accept(this) : new ExpressionList([])
      );
    }

    if (
      ctx instanceof LuaParser.BreakStatContext ||
      ctx instanceof LuaParser.StatBreakContext
    ) {
      return new BreakStatement();
    }

    if (ctx instanceof LuaParser.BlockContext) {
      const lastStmt = ctx.laststat() ? ctx.laststat().accept(this) : null;
      const bodyStmts = (
        (ctx.laststat() ? ctx.children.slice(0, -1) : ctx.children) || []
      ).map((child) => child.accept(this));
      return new Block(bodyStmts, lastStmt);
    }

    if (ctx instanceof LuaParser.VarContext) {
      if (!ctx.varSuffix()) return new Variable(ctx.getText());
      let baseExpr = ctx.NAME() ? new Variable(ctx.NAME().getText()) : new ctx.exp().accept(this);
      let startingSuffixIndex = ctx.NAME() ? 1 : 3;
      for (let x = startingSuffixIndex; x < ctx.getChildCount(); x++) {
        const varSuffix = ctx.getChild(x);
        let y = 0;
        while (varSuffix.getChild(y) instanceof LuaParser.NameAndArgsContext) {
          baseExpr = new FuncCall(baseExpr, varSuffix.getChild(y).args().accept(this));
          y += 1;
        }
        if (varSuffix.getChild(y).getText() === '[') {
          baseExpr = new FieldAccess(baseExpr, varSuffix.exp().accept(this));
        } else {
          baseExpr = new FieldAccess(baseExpr, new StringNode(varSuffix.NAME().getText()));
        }
      }
      return baseExpr;
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
      return ctx instanceof LuaParser.ExplistContext
        ? new ExpressionList(results)
        : results;
    }

    if (ctx instanceof LuaParser.NameAndArgsContext) {
      return ctx.args().accept(this);
    }

    if (ctx instanceof LuaParser.ArgsContext) {
      if (ctx.explist()) {
        return ctx.explist().accept(this);
      } else if (ctx.tableconstructor()) {
        return new ExpressionList([ctx.tableconstructor().accept(this)]);
      } else if (ctx.string()) {
        return new ExpressionList([ctx.string().accept(this)]);
      } else {
        // Must be empty
        return new ExpressionList([]);
      }
    }

    if (ctx instanceof LuaParser.StatLocalAssignmentContext) {
      return new LocalAssignment(
        ctx.getChild(1).accept(this),
        ctx.getChildCount() >= 3
          ? ctx.getChild(3).accept(this)
          : new ExpressionList([])
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
      let toReturn = new FuncCall(
        functionCallNode.varOrExp().accept(this),
        functionCallNode.getChild(1).accept(this)
      );
      for (let x = 2; x < functionCallNode.getChildCount(); x++) {
        toReturn = new FuncCall(
          toReturn,
          functionCallNode.getChild(x).accept(this)
        );
      }

      return toReturn;
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
        new ExpressionList([ctx.getChild(2).accept(this)])
      );
    }

    if (ctx instanceof LuaParser.StatLocalfuncDeclarationContext) {
      return new LocalAssignment(
        [ctx.NAME().getText()],
        new ExpressionList([ctx.funcbody().accept(this)])
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
        let toReturn = new FuncCall(
          ctx.varOrExp().accept(this),
          ctx.getChild(1).accept(this)
        );

        for (let x = 2; x < ctx.getChildCount(); x++) {
          toReturn = new FuncCall(toReturn, ctx.getChild(x).accept(this));
        }

        return toReturn;
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
