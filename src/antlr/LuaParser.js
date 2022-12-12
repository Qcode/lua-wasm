// Generated from java-escape by ANTLR 4.11.1
// jshint ignore: start
import antlr4 from 'antlr4';
import LuaListener from './LuaListener.js';
const serializedATN = [4,1,67,403,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,
2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,2,27,
7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,7,33,2,34,7,
34,1,0,1,0,1,0,1,1,5,1,75,8,1,10,1,12,1,78,9,1,1,1,3,1,81,8,1,1,2,1,2,1,
2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,5,2,117,8,2,10,2,12,
2,120,9,2,1,2,1,2,3,2,124,8,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,
2,136,8,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,162,8,2,3,2,164,8,2,1,3,1,3,3,3,168,
8,3,1,3,3,3,171,8,3,1,4,1,4,1,4,1,4,1,5,1,5,1,5,5,5,180,8,5,10,5,12,5,183,
9,5,1,5,1,5,3,5,187,8,5,1,6,1,6,1,6,5,6,192,8,6,10,6,12,6,195,9,6,1,7,1,
7,1,7,5,7,200,8,7,10,7,12,7,203,9,7,1,8,1,8,1,8,5,8,208,8,8,10,8,12,8,211,
9,8,1,8,1,8,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,3,9,228,
8,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,
1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,5,9,262,8,9,
10,9,12,9,265,9,9,1,10,1,10,5,10,269,8,10,10,10,12,10,272,9,10,1,11,1,11,
4,11,276,8,11,11,11,12,11,277,1,12,1,12,1,12,1,12,1,12,3,12,285,8,12,1,13,
1,13,1,13,1,13,1,13,1,13,3,13,293,8,13,1,13,5,13,296,8,13,10,13,12,13,299,
9,13,1,14,5,14,302,8,14,10,14,12,14,305,9,14,1,14,1,14,1,14,1,14,1,14,1,
14,3,14,313,8,14,1,15,1,15,3,15,317,8,15,1,15,1,15,1,16,1,16,3,16,323,8,
16,1,16,1,16,1,16,3,16,328,8,16,1,17,1,17,1,17,1,18,1,18,3,18,335,8,18,1,
18,1,18,1,18,1,18,1,19,1,19,1,19,3,19,344,8,19,1,19,3,19,347,8,19,1,20,1,
20,3,20,351,8,20,1,20,1,20,1,21,1,21,1,21,1,21,5,21,359,8,21,10,21,12,21,
362,9,21,1,21,3,21,365,8,21,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,
1,22,3,22,377,8,22,1,23,1,23,1,24,1,24,1,25,1,25,1,26,1,26,1,27,1,27,1,28,
1,28,1,29,1,29,1,30,1,30,1,31,1,31,1,32,1,32,1,33,1,33,1,34,1,34,1,34,0,
1,18,35,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,
46,48,50,52,54,56,58,60,62,64,66,68,0,8,2,0,1,1,15,15,1,0,35,40,1,0,42,43,
1,0,44,47,1,0,48,52,3,0,43,43,50,50,53,54,1,0,60,63,1,0,57,59,430,0,70,1,
0,0,0,2,76,1,0,0,0,4,163,1,0,0,0,6,170,1,0,0,0,8,172,1,0,0,0,10,176,1,0,
0,0,12,188,1,0,0,0,14,196,1,0,0,0,16,209,1,0,0,0,18,227,1,0,0,0,20,266,1,
0,0,0,22,273,1,0,0,0,24,284,1,0,0,0,26,292,1,0,0,0,28,303,1,0,0,0,30,316,
1,0,0,0,32,327,1,0,0,0,34,329,1,0,0,0,36,332,1,0,0,0,38,346,1,0,0,0,40,348,
1,0,0,0,42,354,1,0,0,0,44,376,1,0,0,0,46,378,1,0,0,0,48,380,1,0,0,0,50,382,
1,0,0,0,52,384,1,0,0,0,54,386,1,0,0,0,56,388,1,0,0,0,58,390,1,0,0,0,60,392,
1,0,0,0,62,394,1,0,0,0,64,396,1,0,0,0,66,398,1,0,0,0,68,400,1,0,0,0,70,71,
3,2,1,0,71,72,5,0,0,1,72,1,1,0,0,0,73,75,3,4,2,0,74,73,1,0,0,0,75,78,1,0,
0,0,76,74,1,0,0,0,76,77,1,0,0,0,77,80,1,0,0,0,78,76,1,0,0,0,79,81,3,6,3,
0,80,79,1,0,0,0,80,81,1,0,0,0,81,3,1,0,0,0,82,164,5,1,0,0,83,84,3,12,6,0,
84,85,5,2,0,0,85,86,3,16,8,0,86,164,1,0,0,0,87,164,3,22,11,0,88,164,3,8,
4,0,89,164,5,3,0,0,90,91,5,4,0,0,91,164,5,56,0,0,92,93,5,5,0,0,93,94,3,2,
1,0,94,95,5,6,0,0,95,164,1,0,0,0,96,97,5,7,0,0,97,98,3,18,9,0,98,99,5,5,
0,0,99,100,3,2,1,0,100,101,5,6,0,0,101,164,1,0,0,0,102,103,5,8,0,0,103,104,
3,2,1,0,104,105,5,9,0,0,105,106,3,18,9,0,106,164,1,0,0,0,107,108,5,10,0,
0,108,109,3,18,9,0,109,110,5,11,0,0,110,118,3,2,1,0,111,112,5,12,0,0,112,
113,3,18,9,0,113,114,5,11,0,0,114,115,3,2,1,0,115,117,1,0,0,0,116,111,1,
0,0,0,117,120,1,0,0,0,118,116,1,0,0,0,118,119,1,0,0,0,119,123,1,0,0,0,120,
118,1,0,0,0,121,122,5,13,0,0,122,124,3,2,1,0,123,121,1,0,0,0,123,124,1,0,
0,0,124,125,1,0,0,0,125,126,5,6,0,0,126,164,1,0,0,0,127,128,5,14,0,0,128,
129,5,56,0,0,129,130,5,2,0,0,130,131,3,18,9,0,131,132,5,15,0,0,132,135,3,
18,9,0,133,134,5,15,0,0,134,136,3,18,9,0,135,133,1,0,0,0,135,136,1,0,0,0,
136,137,1,0,0,0,137,138,5,5,0,0,138,139,3,2,1,0,139,140,5,6,0,0,140,164,
1,0,0,0,141,142,5,14,0,0,142,143,3,14,7,0,143,144,5,16,0,0,144,145,3,16,
8,0,145,146,5,5,0,0,146,147,3,2,1,0,147,148,5,6,0,0,148,164,1,0,0,0,149,
150,5,17,0,0,150,151,3,10,5,0,151,152,3,36,18,0,152,164,1,0,0,0,153,154,
5,18,0,0,154,155,5,17,0,0,155,156,5,56,0,0,156,164,3,36,18,0,157,158,5,18,
0,0,158,161,3,14,7,0,159,160,5,2,0,0,160,162,3,16,8,0,161,159,1,0,0,0,161,
162,1,0,0,0,162,164,1,0,0,0,163,82,1,0,0,0,163,83,1,0,0,0,163,87,1,0,0,0,
163,88,1,0,0,0,163,89,1,0,0,0,163,90,1,0,0,0,163,92,1,0,0,0,163,96,1,0,0,
0,163,102,1,0,0,0,163,107,1,0,0,0,163,127,1,0,0,0,163,141,1,0,0,0,163,149,
1,0,0,0,163,153,1,0,0,0,163,157,1,0,0,0,164,5,1,0,0,0,165,167,5,19,0,0,166,
168,3,16,8,0,167,166,1,0,0,0,167,168,1,0,0,0,168,171,1,0,0,0,169,171,5,3,
0,0,170,165,1,0,0,0,170,169,1,0,0,0,171,7,1,0,0,0,172,173,5,20,0,0,173,174,
5,56,0,0,174,175,5,20,0,0,175,9,1,0,0,0,176,181,5,56,0,0,177,178,5,21,0,
0,178,180,5,56,0,0,179,177,1,0,0,0,180,183,1,0,0,0,181,179,1,0,0,0,181,182,
1,0,0,0,182,186,1,0,0,0,183,181,1,0,0,0,184,185,5,22,0,0,185,187,5,56,0,
0,186,184,1,0,0,0,186,187,1,0,0,0,187,11,1,0,0,0,188,193,3,26,13,0,189,190,
5,15,0,0,190,192,3,26,13,0,191,189,1,0,0,0,192,195,1,0,0,0,193,191,1,0,0,
0,193,194,1,0,0,0,194,13,1,0,0,0,195,193,1,0,0,0,196,201,5,56,0,0,197,198,
5,15,0,0,198,200,5,56,0,0,199,197,1,0,0,0,200,203,1,0,0,0,201,199,1,0,0,
0,201,202,1,0,0,0,202,15,1,0,0,0,203,201,1,0,0,0,204,205,3,18,9,0,205,206,
5,15,0,0,206,208,1,0,0,0,207,204,1,0,0,0,208,211,1,0,0,0,209,207,1,0,0,0,
209,210,1,0,0,0,210,212,1,0,0,0,211,209,1,0,0,0,212,213,3,18,9,0,213,17,
1,0,0,0,214,215,6,9,-1,0,215,228,5,23,0,0,216,228,5,24,0,0,217,228,5,25,
0,0,218,228,3,66,33,0,219,228,3,68,34,0,220,228,5,26,0,0,221,228,3,34,17,
0,222,228,3,20,10,0,223,228,3,40,20,0,224,225,3,62,31,0,225,226,3,18,9,8,
226,228,1,0,0,0,227,214,1,0,0,0,227,216,1,0,0,0,227,217,1,0,0,0,227,218,
1,0,0,0,227,219,1,0,0,0,227,220,1,0,0,0,227,221,1,0,0,0,227,222,1,0,0,0,
227,223,1,0,0,0,227,224,1,0,0,0,228,263,1,0,0,0,229,230,10,9,0,0,230,231,
3,64,32,0,231,232,3,18,9,9,232,262,1,0,0,0,233,234,10,7,0,0,234,235,3,58,
29,0,235,236,3,18,9,8,236,262,1,0,0,0,237,238,10,6,0,0,238,239,3,56,28,0,
239,240,3,18,9,7,240,262,1,0,0,0,241,242,10,5,0,0,242,243,3,54,27,0,243,
244,3,18,9,5,244,262,1,0,0,0,245,246,10,4,0,0,246,247,3,52,26,0,247,248,
3,18,9,5,248,262,1,0,0,0,249,250,10,3,0,0,250,251,3,50,25,0,251,252,3,18,
9,4,252,262,1,0,0,0,253,254,10,2,0,0,254,255,3,48,24,0,255,256,3,18,9,3,
256,262,1,0,0,0,257,258,10,1,0,0,258,259,3,60,30,0,259,260,3,18,9,2,260,
262,1,0,0,0,261,229,1,0,0,0,261,233,1,0,0,0,261,237,1,0,0,0,261,241,1,0,
0,0,261,245,1,0,0,0,261,249,1,0,0,0,261,253,1,0,0,0,261,257,1,0,0,0,262,
265,1,0,0,0,263,261,1,0,0,0,263,264,1,0,0,0,264,19,1,0,0,0,265,263,1,0,0,
0,266,270,3,24,12,0,267,269,3,30,15,0,268,267,1,0,0,0,269,272,1,0,0,0,270,
268,1,0,0,0,270,271,1,0,0,0,271,21,1,0,0,0,272,270,1,0,0,0,273,275,3,24,
12,0,274,276,3,30,15,0,275,274,1,0,0,0,276,277,1,0,0,0,277,275,1,0,0,0,277,
278,1,0,0,0,278,23,1,0,0,0,279,285,3,26,13,0,280,281,5,27,0,0,281,282,3,
18,9,0,282,283,5,28,0,0,283,285,1,0,0,0,284,279,1,0,0,0,284,280,1,0,0,0,
285,25,1,0,0,0,286,293,5,56,0,0,287,288,5,27,0,0,288,289,3,18,9,0,289,290,
5,28,0,0,290,291,3,28,14,0,291,293,1,0,0,0,292,286,1,0,0,0,292,287,1,0,0,
0,293,297,1,0,0,0,294,296,3,28,14,0,295,294,1,0,0,0,296,299,1,0,0,0,297,
295,1,0,0,0,297,298,1,0,0,0,298,27,1,0,0,0,299,297,1,0,0,0,300,302,3,30,
15,0,301,300,1,0,0,0,302,305,1,0,0,0,303,301,1,0,0,0,303,304,1,0,0,0,304,
312,1,0,0,0,305,303,1,0,0,0,306,307,5,29,0,0,307,308,3,18,9,0,308,309,5,
30,0,0,309,313,1,0,0,0,310,311,5,21,0,0,311,313,5,56,0,0,312,306,1,0,0,0,
312,310,1,0,0,0,313,29,1,0,0,0,314,315,5,22,0,0,315,317,5,56,0,0,316,314,
1,0,0,0,316,317,1,0,0,0,317,318,1,0,0,0,318,319,3,32,16,0,319,31,1,0,0,0,
320,322,5,27,0,0,321,323,3,16,8,0,322,321,1,0,0,0,322,323,1,0,0,0,323,324,
1,0,0,0,324,328,5,28,0,0,325,328,3,40,20,0,326,328,3,68,34,0,327,320,1,0,
0,0,327,325,1,0,0,0,327,326,1,0,0,0,328,33,1,0,0,0,329,330,5,17,0,0,330,
331,3,36,18,0,331,35,1,0,0,0,332,334,5,27,0,0,333,335,3,38,19,0,334,333,
1,0,0,0,334,335,1,0,0,0,335,336,1,0,0,0,336,337,5,28,0,0,337,338,3,2,1,0,
338,339,5,6,0,0,339,37,1,0,0,0,340,343,3,14,7,0,341,342,5,15,0,0,342,344,
5,26,0,0,343,341,1,0,0,0,343,344,1,0,0,0,344,347,1,0,0,0,345,347,5,26,0,
0,346,340,1,0,0,0,346,345,1,0,0,0,347,39,1,0,0,0,348,350,5,31,0,0,349,351,
3,42,21,0,350,349,1,0,0,0,350,351,1,0,0,0,351,352,1,0,0,0,352,353,5,32,0,
0,353,41,1,0,0,0,354,360,3,44,22,0,355,356,3,46,23,0,356,357,3,44,22,0,357,
359,1,0,0,0,358,355,1,0,0,0,359,362,1,0,0,0,360,358,1,0,0,0,360,361,1,0,
0,0,361,364,1,0,0,0,362,360,1,0,0,0,363,365,3,46,23,0,364,363,1,0,0,0,364,
365,1,0,0,0,365,43,1,0,0,0,366,367,5,29,0,0,367,368,3,18,9,0,368,369,5,30,
0,0,369,370,5,2,0,0,370,371,3,18,9,0,371,377,1,0,0,0,372,373,5,56,0,0,373,
374,5,2,0,0,374,377,3,18,9,0,375,377,3,18,9,0,376,366,1,0,0,0,376,372,1,
0,0,0,376,375,1,0,0,0,377,45,1,0,0,0,378,379,7,0,0,0,379,47,1,0,0,0,380,
381,5,33,0,0,381,49,1,0,0,0,382,383,5,34,0,0,383,51,1,0,0,0,384,385,7,1,
0,0,385,53,1,0,0,0,386,387,5,41,0,0,387,55,1,0,0,0,388,389,7,2,0,0,389,57,
1,0,0,0,390,391,7,3,0,0,391,59,1,0,0,0,392,393,7,4,0,0,393,61,1,0,0,0,394,
395,7,5,0,0,395,63,1,0,0,0,396,397,5,55,0,0,397,65,1,0,0,0,398,399,7,6,0,
0,399,67,1,0,0,0,400,401,7,7,0,0,401,69,1,0,0,0,34,76,80,118,123,135,161,
163,167,170,181,186,193,201,209,227,261,263,270,277,284,292,297,303,312,
316,322,327,334,343,346,350,360,364,376];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class LuaParser extends antlr4.Parser {

    static grammarFileName = "java-escape";
    static literalNames = [ null, "';'", "'='", "'break'", "'goto'", "'do'", 
                            "'end'", "'while'", "'repeat'", "'until'", "'if'", 
                            "'then'", "'elseif'", "'else'", "'for'", "','", 
                            "'in'", "'function'", "'local'", "'return'", 
                            "'::'", "'.'", "':'", "'nil'", "'false'", "'true'", 
                            "'...'", "'('", "')'", "'['", "']'", "'{'", 
                            "'}'", "'or'", "'and'", "'<'", "'>'", "'<='", 
                            "'>='", "'~='", "'=='", "'..'", "'+'", "'-'", 
                            "'*'", "'/'", "'%'", "'//'", "'&'", "'|'", "'~'", 
                            "'<<'", "'>>'", "'not'", "'#'", "'^'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             "NAME", "NORMALSTRING", "CHARSTRING", "LONGSTRING", 
                             "INT", "HEX", "FLOAT", "HEX_FLOAT", "COMMENT", 
                             "LINE_COMMENT", "WS", "SHEBANG" ];
    static ruleNames = [ "chunk", "block", "stat", "laststat", "label", 
                         "funcname", "varlist", "namelist", "explist", "exp", 
                         "prefixexp", "functioncall", "varOrExp", "var", 
                         "varSuffix", "nameAndArgs", "args", "functiondef", 
                         "funcbody", "parlist", "tableconstructor", "fieldlist", 
                         "field", "fieldsep", "operatorOr", "operatorAnd", 
                         "operatorComparison", "operatorStrcat", "operatorAddSub", 
                         "operatorMulDivMod", "operatorBitwise", "operatorUnary", 
                         "operatorPower", "number", "string" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = LuaParser.ruleNames;
        this.literalNames = LuaParser.literalNames;
        this.symbolicNames = LuaParser.symbolicNames;
    }

    get atn() {
        return atn;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 9:
    	    		return this.exp_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    exp_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 9);
    		case 1:
    			return this.precpred(this._ctx, 7);
    		case 2:
    			return this.precpred(this._ctx, 6);
    		case 3:
    			return this.precpred(this._ctx, 5);
    		case 4:
    			return this.precpred(this._ctx, 4);
    		case 5:
    			return this.precpred(this._ctx, 3);
    		case 6:
    			return this.precpred(this._ctx, 2);
    		case 7:
    			return this.precpred(this._ctx, 1);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	chunk() {
	    let localctx = new ChunkContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, LuaParser.RULE_chunk);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 70;
	        this.block();
	        this.state = 71;
	        this.match(LuaParser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	block() {
	    let localctx = new BlockContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, LuaParser.RULE_block);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 76;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,0,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 73;
	                this.stat(); 
	            }
	            this.state = 78;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,0,this._ctx);
	        }

	        this.state = 80;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===3 || _la===19) {
	            this.state = 79;
	            this.laststat();
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	stat() {
	    let localctx = new StatContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, LuaParser.RULE_stat);
	    var _la = 0; // Token type
	    try {
	        this.state = 163;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new SemiContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 82;
	            this.match(LuaParser.T__0);
	            break;

	        case 2:
	            localctx = new StatAssignmentContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 83;
	            this.varlist();
	            this.state = 84;
	            this.match(LuaParser.T__1);
	            this.state = 85;
	            this.explist();
	            break;

	        case 3:
	            localctx = new FunccallContext(this, localctx);
	            this.enterOuterAlt(localctx, 3);
	            this.state = 87;
	            this.functioncall();
	            break;

	        case 4:
	            localctx = new StatLabelContext(this, localctx);
	            this.enterOuterAlt(localctx, 4);
	            this.state = 88;
	            this.label();
	            break;

	        case 5:
	            localctx = new StatBreakContext(this, localctx);
	            this.enterOuterAlt(localctx, 5);
	            this.state = 89;
	            this.match(LuaParser.T__2);
	            break;

	        case 6:
	            localctx = new StatGotoContext(this, localctx);
	            this.enterOuterAlt(localctx, 6);
	            this.state = 90;
	            this.match(LuaParser.T__3);
	            this.state = 91;
	            this.match(LuaParser.NAME);
	            break;

	        case 7:
	            localctx = new StatDoContext(this, localctx);
	            this.enterOuterAlt(localctx, 7);
	            this.state = 92;
	            this.match(LuaParser.T__4);
	            this.state = 93;
	            this.block();
	            this.state = 94;
	            this.match(LuaParser.T__5);
	            break;

	        case 8:
	            localctx = new StatWhileContext(this, localctx);
	            this.enterOuterAlt(localctx, 8);
	            this.state = 96;
	            this.match(LuaParser.T__6);
	            this.state = 97;
	            this.exp(0);
	            this.state = 98;
	            this.match(LuaParser.T__4);
	            this.state = 99;
	            this.block();
	            this.state = 100;
	            this.match(LuaParser.T__5);
	            break;

	        case 9:
	            localctx = new StatRepeatContext(this, localctx);
	            this.enterOuterAlt(localctx, 9);
	            this.state = 102;
	            this.match(LuaParser.T__7);
	            this.state = 103;
	            this.block();
	            this.state = 104;
	            this.match(LuaParser.T__8);
	            this.state = 105;
	            this.exp(0);
	            break;

	        case 10:
	            localctx = new StatIfContext(this, localctx);
	            this.enterOuterAlt(localctx, 10);
	            this.state = 107;
	            this.match(LuaParser.T__9);
	            this.state = 108;
	            this.exp(0);
	            this.state = 109;
	            this.match(LuaParser.T__10);
	            this.state = 110;
	            this.block();
	            this.state = 118;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===12) {
	                this.state = 111;
	                this.match(LuaParser.T__11);
	                this.state = 112;
	                this.exp(0);
	                this.state = 113;
	                this.match(LuaParser.T__10);
	                this.state = 114;
	                this.block();
	                this.state = 120;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 123;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===13) {
	                this.state = 121;
	                this.match(LuaParser.T__12);
	                this.state = 122;
	                this.block();
	            }

	            this.state = 125;
	            this.match(LuaParser.T__5);
	            break;

	        case 11:
	            localctx = new StatNumericForContext(this, localctx);
	            this.enterOuterAlt(localctx, 11);
	            this.state = 127;
	            this.match(LuaParser.T__13);
	            this.state = 128;
	            this.match(LuaParser.NAME);
	            this.state = 129;
	            this.match(LuaParser.T__1);
	            this.state = 130;
	            this.exp(0);
	            this.state = 131;
	            this.match(LuaParser.T__14);
	            this.state = 132;
	            this.exp(0);
	            this.state = 135;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===15) {
	                this.state = 133;
	                this.match(LuaParser.T__14);
	                this.state = 134;
	                this.exp(0);
	            }

	            this.state = 137;
	            this.match(LuaParser.T__4);
	            this.state = 138;
	            this.block();
	            this.state = 139;
	            this.match(LuaParser.T__5);
	            break;

	        case 12:
	            localctx = new StatGenericForContext(this, localctx);
	            this.enterOuterAlt(localctx, 12);
	            this.state = 141;
	            this.match(LuaParser.T__13);
	            this.state = 142;
	            this.namelist();
	            this.state = 143;
	            this.match(LuaParser.T__15);
	            this.state = 144;
	            this.explist();
	            this.state = 145;
	            this.match(LuaParser.T__4);
	            this.state = 146;
	            this.block();
	            this.state = 147;
	            this.match(LuaParser.T__5);
	            break;

	        case 13:
	            localctx = new StatFuncDeclarationContext(this, localctx);
	            this.enterOuterAlt(localctx, 13);
	            this.state = 149;
	            this.match(LuaParser.T__16);
	            this.state = 150;
	            this.funcname();
	            this.state = 151;
	            this.funcbody();
	            break;

	        case 14:
	            localctx = new StatLocalfuncDeclarationContext(this, localctx);
	            this.enterOuterAlt(localctx, 14);
	            this.state = 153;
	            this.match(LuaParser.T__17);
	            this.state = 154;
	            this.match(LuaParser.T__16);
	            this.state = 155;
	            this.match(LuaParser.NAME);
	            this.state = 156;
	            this.funcbody();
	            break;

	        case 15:
	            localctx = new StatLocalAssignmentContext(this, localctx);
	            this.enterOuterAlt(localctx, 15);
	            this.state = 157;
	            this.match(LuaParser.T__17);
	            this.state = 158;
	            this.namelist();
	            this.state = 161;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===2) {
	                this.state = 159;
	                this.match(LuaParser.T__1);
	                this.state = 160;
	                this.explist();
	            }

	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	laststat() {
	    let localctx = new LaststatContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, LuaParser.RULE_laststat);
	    var _la = 0; // Token type
	    try {
	        this.state = 170;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 19:
	            localctx = new ReturnStatContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 165;
	            this.match(LuaParser.T__18);
	            this.state = 167;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if((((_la) & ~0x1f) == 0 && ((1 << _la) & 2407661568) !== 0) || ((((_la - 43)) & ~0x1f) == 0 && ((1 << (_la - 43)) & 2092161) !== 0)) {
	                this.state = 166;
	                this.explist();
	            }

	            break;
	        case 3:
	            localctx = new BreakStatContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 169;
	            this.match(LuaParser.T__2);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	label() {
	    let localctx = new LabelContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, LuaParser.RULE_label);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 172;
	        this.match(LuaParser.T__19);
	        this.state = 173;
	        this.match(LuaParser.NAME);
	        this.state = 174;
	        this.match(LuaParser.T__19);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	funcname() {
	    let localctx = new FuncnameContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, LuaParser.RULE_funcname);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 176;
	        this.match(LuaParser.NAME);
	        this.state = 181;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===21) {
	            this.state = 177;
	            this.match(LuaParser.T__20);
	            this.state = 178;
	            this.match(LuaParser.NAME);
	            this.state = 183;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 186;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===22) {
	            this.state = 184;
	            this.match(LuaParser.T__21);
	            this.state = 185;
	            this.match(LuaParser.NAME);
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	varlist() {
	    let localctx = new VarlistContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, LuaParser.RULE_varlist);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 188;
	        this.var_();
	        this.state = 193;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===15) {
	            this.state = 189;
	            this.match(LuaParser.T__14);
	            this.state = 190;
	            this.var_();
	            this.state = 195;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	namelist() {
	    let localctx = new NamelistContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, LuaParser.RULE_namelist);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 196;
	        this.match(LuaParser.NAME);
	        this.state = 201;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,12,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 197;
	                this.match(LuaParser.T__14);
	                this.state = 198;
	                this.match(LuaParser.NAME); 
	            }
	            this.state = 203;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,12,this._ctx);
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	explist() {
	    let localctx = new ExplistContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, LuaParser.RULE_explist);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 209;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,13,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 204;
	                this.exp(0);
	                this.state = 205;
	                this.match(LuaParser.T__14); 
	            }
	            this.state = 211;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,13,this._ctx);
	        }

	        this.state = 212;
	        this.exp(0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


	exp(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new ExpContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 18;
	    this.enterRecursionRule(localctx, 18, LuaParser.RULE_exp, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 227;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 23:
	            localctx = new ExpNilContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 215;
	            this.match(LuaParser.T__22);
	            break;
	        case 24:
	            localctx = new ExpFalseContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 216;
	            this.match(LuaParser.T__23);
	            break;
	        case 25:
	            localctx = new ExpTrueContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 217;
	            this.match(LuaParser.T__24);
	            break;
	        case 60:
	        case 61:
	        case 62:
	        case 63:
	            localctx = new ExpNumberContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 218;
	            this.number();
	            break;
	        case 57:
	        case 58:
	        case 59:
	            localctx = new ExpStringContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 219;
	            this.string();
	            break;
	        case 26:
	            localctx = new ExpVariadicContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 220;
	            this.match(LuaParser.T__25);
	            break;
	        case 17:
	            localctx = new ExpFuncDefContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 221;
	            this.functiondef();
	            break;
	        case 27:
	        case 56:
	            localctx = new ExpPrefixExpContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 222;
	            this.prefixexp();
	            break;
	        case 31:
	            localctx = new ExpTableCtorContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 223;
	            this.tableconstructor();
	            break;
	        case 43:
	        case 50:
	        case 53:
	        case 54:
	            localctx = new ExpUnaryContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 224;
	            this.operatorUnary();
	            this.state = 225;
	            this.exp(8);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 263;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,16,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 261;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,15,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new ExpPowerContext(this, new ExpContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LuaParser.RULE_exp);
	                    this.state = 229;
	                    if (!( this.precpred(this._ctx, 9))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
	                    }
	                    this.state = 230;
	                    this.operatorPower();
	                    this.state = 231;
	                    this.exp(9);
	                    break;

	                case 2:
	                    localctx = new ExpMulDivModContext(this, new ExpContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LuaParser.RULE_exp);
	                    this.state = 233;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 234;
	                    this.operatorMulDivMod();
	                    this.state = 235;
	                    this.exp(8);
	                    break;

	                case 3:
	                    localctx = new ExpAddSubContext(this, new ExpContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LuaParser.RULE_exp);
	                    this.state = 237;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 238;
	                    this.operatorAddSub();
	                    this.state = 239;
	                    this.exp(7);
	                    break;

	                case 4:
	                    localctx = new ExpConcatContext(this, new ExpContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LuaParser.RULE_exp);
	                    this.state = 241;
	                    if (!( this.precpred(this._ctx, 5))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
	                    }
	                    this.state = 242;
	                    this.operatorStrcat();
	                    this.state = 243;
	                    this.exp(5);
	                    break;

	                case 5:
	                    localctx = new ExpComparisonContext(this, new ExpContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LuaParser.RULE_exp);
	                    this.state = 245;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 246;
	                    this.operatorComparison();
	                    this.state = 247;
	                    this.exp(5);
	                    break;

	                case 6:
	                    localctx = new ExpAndContext(this, new ExpContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LuaParser.RULE_exp);
	                    this.state = 249;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 250;
	                    this.operatorAnd();
	                    this.state = 251;
	                    this.exp(4);
	                    break;

	                case 7:
	                    localctx = new ExpOrContext(this, new ExpContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LuaParser.RULE_exp);
	                    this.state = 253;
	                    if (!( this.precpred(this._ctx, 2))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                    }
	                    this.state = 254;
	                    this.operatorOr();
	                    this.state = 255;
	                    this.exp(3);
	                    break;

	                case 8:
	                    localctx = new ExpBitWiseContext(this, new ExpContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LuaParser.RULE_exp);
	                    this.state = 257;
	                    if (!( this.precpred(this._ctx, 1))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
	                    }
	                    this.state = 258;
	                    this.operatorBitwise();
	                    this.state = 259;
	                    this.exp(2);
	                    break;

	                } 
	            }
	            this.state = 265;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,16,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	prefixexp() {
	    let localctx = new PrefixexpContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, LuaParser.RULE_prefixexp);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 266;
	        this.varOrExp();
	        this.state = 270;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,17,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 267;
	                this.nameAndArgs(); 
	            }
	            this.state = 272;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,17,this._ctx);
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	functioncall() {
	    let localctx = new FunctioncallContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, LuaParser.RULE_functioncall);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 273;
	        this.varOrExp();
	        this.state = 275; 
	        this._errHandler.sync(this);
	        var _alt = 1;
	        do {
	        	switch (_alt) {
	        	case 1:
	        		this.state = 274;
	        		this.nameAndArgs();
	        		break;
	        	default:
	        		throw new antlr4.error.NoViableAltException(this);
	        	}
	        	this.state = 277; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,18, this._ctx);
	        } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	varOrExp() {
	    let localctx = new VarOrExpContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 24, LuaParser.RULE_varOrExp);
	    try {
	        this.state = 284;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,19,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 279;
	            this.var_();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 280;
	            this.match(LuaParser.T__26);
	            this.state = 281;
	            this.exp(0);
	            this.state = 282;
	            this.match(LuaParser.T__27);
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	var_() {
	    let localctx = new VarContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 26, LuaParser.RULE_var);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 292;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 56:
	            this.state = 286;
	            this.match(LuaParser.NAME);
	            break;
	        case 27:
	            this.state = 287;
	            this.match(LuaParser.T__26);
	            this.state = 288;
	            this.exp(0);
	            this.state = 289;
	            this.match(LuaParser.T__27);
	            this.state = 290;
	            this.varSuffix();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 297;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,21,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 294;
	                this.varSuffix(); 
	            }
	            this.state = 299;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,21,this._ctx);
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	varSuffix() {
	    let localctx = new VarSuffixContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, LuaParser.RULE_varSuffix);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 303;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) == 0 && ((1 << _la) & 2285895680) !== 0) || ((((_la - 57)) & ~0x1f) == 0 && ((1 << (_la - 57)) & 7) !== 0)) {
	            this.state = 300;
	            this.nameAndArgs();
	            this.state = 305;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 312;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 29:
	            this.state = 306;
	            this.match(LuaParser.T__28);
	            this.state = 307;
	            this.exp(0);
	            this.state = 308;
	            this.match(LuaParser.T__29);
	            break;
	        case 21:
	            this.state = 310;
	            this.match(LuaParser.T__20);
	            this.state = 311;
	            this.match(LuaParser.NAME);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	nameAndArgs() {
	    let localctx = new NameAndArgsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 30, LuaParser.RULE_nameAndArgs);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 316;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===22) {
	            this.state = 314;
	            this.match(LuaParser.T__21);
	            this.state = 315;
	            this.match(LuaParser.NAME);
	        }

	        this.state = 318;
	        this.args();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	args() {
	    let localctx = new ArgsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 32, LuaParser.RULE_args);
	    var _la = 0; // Token type
	    try {
	        this.state = 327;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 27:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 320;
	            this.match(LuaParser.T__26);
	            this.state = 322;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if((((_la) & ~0x1f) == 0 && ((1 << _la) & 2407661568) !== 0) || ((((_la - 43)) & ~0x1f) == 0 && ((1 << (_la - 43)) & 2092161) !== 0)) {
	                this.state = 321;
	                this.explist();
	            }

	            this.state = 324;
	            this.match(LuaParser.T__27);
	            break;
	        case 31:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 325;
	            this.tableconstructor();
	            break;
	        case 57:
	        case 58:
	        case 59:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 326;
	            this.string();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	functiondef() {
	    let localctx = new FunctiondefContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 34, LuaParser.RULE_functiondef);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 329;
	        this.match(LuaParser.T__16);
	        this.state = 330;
	        this.funcbody();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	funcbody() {
	    let localctx = new FuncbodyContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 36, LuaParser.RULE_funcbody);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 332;
	        this.match(LuaParser.T__26);
	        this.state = 334;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===26 || _la===56) {
	            this.state = 333;
	            this.parlist();
	        }

	        this.state = 336;
	        this.match(LuaParser.T__27);
	        this.state = 337;
	        this.block();
	        this.state = 338;
	        this.match(LuaParser.T__5);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	parlist() {
	    let localctx = new ParlistContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 38, LuaParser.RULE_parlist);
	    var _la = 0; // Token type
	    try {
	        this.state = 346;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 56:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 340;
	            this.namelist();
	            this.state = 343;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===15) {
	                this.state = 341;
	                this.match(LuaParser.T__14);
	                this.state = 342;
	                this.match(LuaParser.T__25);
	            }

	            break;
	        case 26:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 345;
	            this.match(LuaParser.T__25);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	tableconstructor() {
	    let localctx = new TableconstructorContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 40, LuaParser.RULE_tableconstructor);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 348;
	        this.match(LuaParser.T__30);
	        this.state = 350;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if((((_la) & ~0x1f) == 0 && ((1 << _la) & 2944532480) !== 0) || ((((_la - 43)) & ~0x1f) == 0 && ((1 << (_la - 43)) & 2092161) !== 0)) {
	            this.state = 349;
	            this.fieldlist();
	        }

	        this.state = 352;
	        this.match(LuaParser.T__31);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	fieldlist() {
	    let localctx = new FieldlistContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 42, LuaParser.RULE_fieldlist);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 354;
	        this.field();
	        this.state = 360;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,31,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 355;
	                this.fieldsep();
	                this.state = 356;
	                this.field(); 
	            }
	            this.state = 362;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,31,this._ctx);
	        }

	        this.state = 364;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===1 || _la===15) {
	            this.state = 363;
	            this.fieldsep();
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	field() {
	    let localctx = new FieldContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 44, LuaParser.RULE_field);
	    try {
	        this.state = 376;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,33,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 366;
	            this.match(LuaParser.T__28);
	            this.state = 367;
	            this.exp(0);
	            this.state = 368;
	            this.match(LuaParser.T__29);
	            this.state = 369;
	            this.match(LuaParser.T__1);
	            this.state = 370;
	            this.exp(0);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 372;
	            this.match(LuaParser.NAME);
	            this.state = 373;
	            this.match(LuaParser.T__1);
	            this.state = 374;
	            this.exp(0);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 375;
	            this.exp(0);
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	fieldsep() {
	    let localctx = new FieldsepContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 46, LuaParser.RULE_fieldsep);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 378;
	        _la = this._input.LA(1);
	        if(!(_la===1 || _la===15)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	operatorOr() {
	    let localctx = new OperatorOrContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 48, LuaParser.RULE_operatorOr);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 380;
	        this.match(LuaParser.T__32);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	operatorAnd() {
	    let localctx = new OperatorAndContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 50, LuaParser.RULE_operatorAnd);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 382;
	        this.match(LuaParser.T__33);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	operatorComparison() {
	    let localctx = new OperatorComparisonContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 52, LuaParser.RULE_operatorComparison);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 384;
	        _la = this._input.LA(1);
	        if(!(((((_la - 35)) & ~0x1f) == 0 && ((1 << (_la - 35)) & 63) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	operatorStrcat() {
	    let localctx = new OperatorStrcatContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 54, LuaParser.RULE_operatorStrcat);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 386;
	        this.match(LuaParser.T__40);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	operatorAddSub() {
	    let localctx = new OperatorAddSubContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 56, LuaParser.RULE_operatorAddSub);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 388;
	        _la = this._input.LA(1);
	        if(!(_la===42 || _la===43)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	operatorMulDivMod() {
	    let localctx = new OperatorMulDivModContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 58, LuaParser.RULE_operatorMulDivMod);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 390;
	        _la = this._input.LA(1);
	        if(!(((((_la - 44)) & ~0x1f) == 0 && ((1 << (_la - 44)) & 15) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	operatorBitwise() {
	    let localctx = new OperatorBitwiseContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 60, LuaParser.RULE_operatorBitwise);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 392;
	        _la = this._input.LA(1);
	        if(!(((((_la - 48)) & ~0x1f) == 0 && ((1 << (_la - 48)) & 31) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	operatorUnary() {
	    let localctx = new OperatorUnaryContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 62, LuaParser.RULE_operatorUnary);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 394;
	        _la = this._input.LA(1);
	        if(!(((((_la - 43)) & ~0x1f) == 0 && ((1 << (_la - 43)) & 3201) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	operatorPower() {
	    let localctx = new OperatorPowerContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 64, LuaParser.RULE_operatorPower);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 396;
	        this.match(LuaParser.T__54);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	number() {
	    let localctx = new NumberContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 66, LuaParser.RULE_number);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 398;
	        _la = this._input.LA(1);
	        if(!(((((_la - 60)) & ~0x1f) == 0 && ((1 << (_la - 60)) & 15) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	string() {
	    let localctx = new StringContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 68, LuaParser.RULE_string);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 400;
	        _la = this._input.LA(1);
	        if(!(((((_la - 57)) & ~0x1f) == 0 && ((1 << (_la - 57)) & 7) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

LuaParser.EOF = antlr4.Token.EOF;
LuaParser.T__0 = 1;
LuaParser.T__1 = 2;
LuaParser.T__2 = 3;
LuaParser.T__3 = 4;
LuaParser.T__4 = 5;
LuaParser.T__5 = 6;
LuaParser.T__6 = 7;
LuaParser.T__7 = 8;
LuaParser.T__8 = 9;
LuaParser.T__9 = 10;
LuaParser.T__10 = 11;
LuaParser.T__11 = 12;
LuaParser.T__12 = 13;
LuaParser.T__13 = 14;
LuaParser.T__14 = 15;
LuaParser.T__15 = 16;
LuaParser.T__16 = 17;
LuaParser.T__17 = 18;
LuaParser.T__18 = 19;
LuaParser.T__19 = 20;
LuaParser.T__20 = 21;
LuaParser.T__21 = 22;
LuaParser.T__22 = 23;
LuaParser.T__23 = 24;
LuaParser.T__24 = 25;
LuaParser.T__25 = 26;
LuaParser.T__26 = 27;
LuaParser.T__27 = 28;
LuaParser.T__28 = 29;
LuaParser.T__29 = 30;
LuaParser.T__30 = 31;
LuaParser.T__31 = 32;
LuaParser.T__32 = 33;
LuaParser.T__33 = 34;
LuaParser.T__34 = 35;
LuaParser.T__35 = 36;
LuaParser.T__36 = 37;
LuaParser.T__37 = 38;
LuaParser.T__38 = 39;
LuaParser.T__39 = 40;
LuaParser.T__40 = 41;
LuaParser.T__41 = 42;
LuaParser.T__42 = 43;
LuaParser.T__43 = 44;
LuaParser.T__44 = 45;
LuaParser.T__45 = 46;
LuaParser.T__46 = 47;
LuaParser.T__47 = 48;
LuaParser.T__48 = 49;
LuaParser.T__49 = 50;
LuaParser.T__50 = 51;
LuaParser.T__51 = 52;
LuaParser.T__52 = 53;
LuaParser.T__53 = 54;
LuaParser.T__54 = 55;
LuaParser.NAME = 56;
LuaParser.NORMALSTRING = 57;
LuaParser.CHARSTRING = 58;
LuaParser.LONGSTRING = 59;
LuaParser.INT = 60;
LuaParser.HEX = 61;
LuaParser.FLOAT = 62;
LuaParser.HEX_FLOAT = 63;
LuaParser.COMMENT = 64;
LuaParser.LINE_COMMENT = 65;
LuaParser.WS = 66;
LuaParser.SHEBANG = 67;

LuaParser.RULE_chunk = 0;
LuaParser.RULE_block = 1;
LuaParser.RULE_stat = 2;
LuaParser.RULE_laststat = 3;
LuaParser.RULE_label = 4;
LuaParser.RULE_funcname = 5;
LuaParser.RULE_varlist = 6;
LuaParser.RULE_namelist = 7;
LuaParser.RULE_explist = 8;
LuaParser.RULE_exp = 9;
LuaParser.RULE_prefixexp = 10;
LuaParser.RULE_functioncall = 11;
LuaParser.RULE_varOrExp = 12;
LuaParser.RULE_var = 13;
LuaParser.RULE_varSuffix = 14;
LuaParser.RULE_nameAndArgs = 15;
LuaParser.RULE_args = 16;
LuaParser.RULE_functiondef = 17;
LuaParser.RULE_funcbody = 18;
LuaParser.RULE_parlist = 19;
LuaParser.RULE_tableconstructor = 20;
LuaParser.RULE_fieldlist = 21;
LuaParser.RULE_field = 22;
LuaParser.RULE_fieldsep = 23;
LuaParser.RULE_operatorOr = 24;
LuaParser.RULE_operatorAnd = 25;
LuaParser.RULE_operatorComparison = 26;
LuaParser.RULE_operatorStrcat = 27;
LuaParser.RULE_operatorAddSub = 28;
LuaParser.RULE_operatorMulDivMod = 29;
LuaParser.RULE_operatorBitwise = 30;
LuaParser.RULE_operatorUnary = 31;
LuaParser.RULE_operatorPower = 32;
LuaParser.RULE_number = 33;
LuaParser.RULE_string = 34;

class ChunkContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_chunk;
    }

	block() {
	    return this.getTypedRuleContext(BlockContext,0);
	};

	EOF() {
	    return this.getToken(LuaParser.EOF, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterChunk(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitChunk(this);
		}
	}


}



class BlockContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_block;
    }

	stat = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(StatContext);
	    } else {
	        return this.getTypedRuleContext(StatContext,i);
	    }
	};

	laststat() {
	    return this.getTypedRuleContext(LaststatContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterBlock(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitBlock(this);
		}
	}


}



class StatContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_stat;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class StatGenericForContext extends StatContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	namelist() {
	    return this.getTypedRuleContext(NamelistContext,0);
	};

	explist() {
	    return this.getTypedRuleContext(ExplistContext,0);
	};

	block() {
	    return this.getTypedRuleContext(BlockContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterStatGenericFor(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitStatGenericFor(this);
		}
	}


}

LuaParser.StatGenericForContext = StatGenericForContext;

class FunccallContext extends StatContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	functioncall() {
	    return this.getTypedRuleContext(FunctioncallContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterFunccall(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitFunccall(this);
		}
	}


}

LuaParser.FunccallContext = FunccallContext;

class StatBreakContext extends StatContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }


	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterStatBreak(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitStatBreak(this);
		}
	}


}

LuaParser.StatBreakContext = StatBreakContext;

class StatAssignmentContext extends StatContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	varlist() {
	    return this.getTypedRuleContext(VarlistContext,0);
	};

	explist() {
	    return this.getTypedRuleContext(ExplistContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterStatAssignment(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitStatAssignment(this);
		}
	}


}

LuaParser.StatAssignmentContext = StatAssignmentContext;

class StatLocalfuncDeclarationContext extends StatContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	NAME() {
	    return this.getToken(LuaParser.NAME, 0);
	};

	funcbody() {
	    return this.getTypedRuleContext(FuncbodyContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterStatLocalfuncDeclaration(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitStatLocalfuncDeclaration(this);
		}
	}


}

LuaParser.StatLocalfuncDeclarationContext = StatLocalfuncDeclarationContext;

class StatLabelContext extends StatContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	label() {
	    return this.getTypedRuleContext(LabelContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterStatLabel(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitStatLabel(this);
		}
	}


}

LuaParser.StatLabelContext = StatLabelContext;

class StatDoContext extends StatContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	block() {
	    return this.getTypedRuleContext(BlockContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterStatDo(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitStatDo(this);
		}
	}


}

LuaParser.StatDoContext = StatDoContext;

class StatWhileContext extends StatContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	exp() {
	    return this.getTypedRuleContext(ExpContext,0);
	};

	block() {
	    return this.getTypedRuleContext(BlockContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterStatWhile(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitStatWhile(this);
		}
	}


}

LuaParser.StatWhileContext = StatWhileContext;

class StatGotoContext extends StatContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	NAME() {
	    return this.getToken(LuaParser.NAME, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterStatGoto(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitStatGoto(this);
		}
	}


}

LuaParser.StatGotoContext = StatGotoContext;

class StatFuncDeclarationContext extends StatContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	funcname() {
	    return this.getTypedRuleContext(FuncnameContext,0);
	};

	funcbody() {
	    return this.getTypedRuleContext(FuncbodyContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterStatFuncDeclaration(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitStatFuncDeclaration(this);
		}
	}


}

LuaParser.StatFuncDeclarationContext = StatFuncDeclarationContext;

class StatRepeatContext extends StatContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	block() {
	    return this.getTypedRuleContext(BlockContext,0);
	};

	exp() {
	    return this.getTypedRuleContext(ExpContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterStatRepeat(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitStatRepeat(this);
		}
	}


}

LuaParser.StatRepeatContext = StatRepeatContext;

class SemiContext extends StatContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }


	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterSemi(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitSemi(this);
		}
	}


}

LuaParser.SemiContext = SemiContext;

class StatIfContext extends StatContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	exp = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpContext);
	    } else {
	        return this.getTypedRuleContext(ExpContext,i);
	    }
	};

	block = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(BlockContext);
	    } else {
	        return this.getTypedRuleContext(BlockContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterStatIf(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitStatIf(this);
		}
	}


}

LuaParser.StatIfContext = StatIfContext;

class StatNumericForContext extends StatContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	NAME() {
	    return this.getToken(LuaParser.NAME, 0);
	};

	exp = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpContext);
	    } else {
	        return this.getTypedRuleContext(ExpContext,i);
	    }
	};

	block() {
	    return this.getTypedRuleContext(BlockContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterStatNumericFor(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitStatNumericFor(this);
		}
	}


}

LuaParser.StatNumericForContext = StatNumericForContext;

class StatLocalAssignmentContext extends StatContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	namelist() {
	    return this.getTypedRuleContext(NamelistContext,0);
	};

	explist() {
	    return this.getTypedRuleContext(ExplistContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterStatLocalAssignment(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitStatLocalAssignment(this);
		}
	}


}

LuaParser.StatLocalAssignmentContext = StatLocalAssignmentContext;

class LaststatContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_laststat;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class ReturnStatContext extends LaststatContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	explist() {
	    return this.getTypedRuleContext(ExplistContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterReturnStat(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitReturnStat(this);
		}
	}


}

LuaParser.ReturnStatContext = ReturnStatContext;

class BreakStatContext extends LaststatContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }


	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterBreakStat(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitBreakStat(this);
		}
	}


}

LuaParser.BreakStatContext = BreakStatContext;

class LabelContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_label;
    }

	NAME() {
	    return this.getToken(LuaParser.NAME, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterLabel(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitLabel(this);
		}
	}


}



class FuncnameContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_funcname;
    }

	NAME = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LuaParser.NAME);
	    } else {
	        return this.getToken(LuaParser.NAME, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterFuncname(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitFuncname(this);
		}
	}


}



class VarlistContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_varlist;
    }

	var_ = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(VarContext);
	    } else {
	        return this.getTypedRuleContext(VarContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterVarlist(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitVarlist(this);
		}
	}


}



class NamelistContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_namelist;
    }

	NAME = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LuaParser.NAME);
	    } else {
	        return this.getToken(LuaParser.NAME, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterNamelist(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitNamelist(this);
		}
	}


}



class ExplistContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_explist;
    }

	exp = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpContext);
	    } else {
	        return this.getTypedRuleContext(ExpContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterExplist(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitExplist(this);
		}
	}


}



class ExpContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_exp;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class ExpNumberContext extends ExpContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	number() {
	    return this.getTypedRuleContext(NumberContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterExpNumber(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitExpNumber(this);
		}
	}


}

LuaParser.ExpNumberContext = ExpNumberContext;

class ExpComparisonContext extends ExpContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	exp = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpContext);
	    } else {
	        return this.getTypedRuleContext(ExpContext,i);
	    }
	};

	operatorComparison() {
	    return this.getTypedRuleContext(OperatorComparisonContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterExpComparison(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitExpComparison(this);
		}
	}


}

LuaParser.ExpComparisonContext = ExpComparisonContext;

class ExpTrueContext extends ExpContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }


	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterExpTrue(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitExpTrue(this);
		}
	}


}

LuaParser.ExpTrueContext = ExpTrueContext;

class ExpOrContext extends ExpContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	exp = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpContext);
	    } else {
	        return this.getTypedRuleContext(ExpContext,i);
	    }
	};

	operatorOr() {
	    return this.getTypedRuleContext(OperatorOrContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterExpOr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitExpOr(this);
		}
	}


}

LuaParser.ExpOrContext = ExpOrContext;

class ExpTableCtorContext extends ExpContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	tableconstructor() {
	    return this.getTypedRuleContext(TableconstructorContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterExpTableCtor(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitExpTableCtor(this);
		}
	}


}

LuaParser.ExpTableCtorContext = ExpTableCtorContext;

class ExpVariadicContext extends ExpContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }


	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterExpVariadic(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitExpVariadic(this);
		}
	}


}

LuaParser.ExpVariadicContext = ExpVariadicContext;

class ExpMulDivModContext extends ExpContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	exp = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpContext);
	    } else {
	        return this.getTypedRuleContext(ExpContext,i);
	    }
	};

	operatorMulDivMod() {
	    return this.getTypedRuleContext(OperatorMulDivModContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterExpMulDivMod(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitExpMulDivMod(this);
		}
	}


}

LuaParser.ExpMulDivModContext = ExpMulDivModContext;

class ExpFuncDefContext extends ExpContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	functiondef() {
	    return this.getTypedRuleContext(FunctiondefContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterExpFuncDef(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitExpFuncDef(this);
		}
	}


}

LuaParser.ExpFuncDefContext = ExpFuncDefContext;

class ExpFalseContext extends ExpContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }


	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterExpFalse(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitExpFalse(this);
		}
	}


}

LuaParser.ExpFalseContext = ExpFalseContext;

class ExpStringContext extends ExpContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	string() {
	    return this.getTypedRuleContext(StringContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterExpString(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitExpString(this);
		}
	}


}

LuaParser.ExpStringContext = ExpStringContext;

class ExpUnaryContext extends ExpContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	operatorUnary() {
	    return this.getTypedRuleContext(OperatorUnaryContext,0);
	};

	exp() {
	    return this.getTypedRuleContext(ExpContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterExpUnary(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitExpUnary(this);
		}
	}


}

LuaParser.ExpUnaryContext = ExpUnaryContext;

class ExpBitWiseContext extends ExpContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	exp = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpContext);
	    } else {
	        return this.getTypedRuleContext(ExpContext,i);
	    }
	};

	operatorBitwise() {
	    return this.getTypedRuleContext(OperatorBitwiseContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterExpBitWise(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitExpBitWise(this);
		}
	}


}

LuaParser.ExpBitWiseContext = ExpBitWiseContext;

class ExpAndContext extends ExpContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	exp = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpContext);
	    } else {
	        return this.getTypedRuleContext(ExpContext,i);
	    }
	};

	operatorAnd() {
	    return this.getTypedRuleContext(OperatorAndContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterExpAnd(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitExpAnd(this);
		}
	}


}

LuaParser.ExpAndContext = ExpAndContext;

class ExpPowerContext extends ExpContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	exp = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpContext);
	    } else {
	        return this.getTypedRuleContext(ExpContext,i);
	    }
	};

	operatorPower() {
	    return this.getTypedRuleContext(OperatorPowerContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterExpPower(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitExpPower(this);
		}
	}


}

LuaParser.ExpPowerContext = ExpPowerContext;

class ExpPrefixExpContext extends ExpContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	prefixexp() {
	    return this.getTypedRuleContext(PrefixexpContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterExpPrefixExp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitExpPrefixExp(this);
		}
	}


}

LuaParser.ExpPrefixExpContext = ExpPrefixExpContext;

class ExpConcatContext extends ExpContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	exp = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpContext);
	    } else {
	        return this.getTypedRuleContext(ExpContext,i);
	    }
	};

	operatorStrcat() {
	    return this.getTypedRuleContext(OperatorStrcatContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterExpConcat(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitExpConcat(this);
		}
	}


}

LuaParser.ExpConcatContext = ExpConcatContext;

class ExpNilContext extends ExpContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }


	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterExpNil(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitExpNil(this);
		}
	}


}

LuaParser.ExpNilContext = ExpNilContext;

class ExpAddSubContext extends ExpContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	exp = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpContext);
	    } else {
	        return this.getTypedRuleContext(ExpContext,i);
	    }
	};

	operatorAddSub() {
	    return this.getTypedRuleContext(OperatorAddSubContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterExpAddSub(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitExpAddSub(this);
		}
	}


}

LuaParser.ExpAddSubContext = ExpAddSubContext;

class PrefixexpContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_prefixexp;
    }

	varOrExp() {
	    return this.getTypedRuleContext(VarOrExpContext,0);
	};

	nameAndArgs = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(NameAndArgsContext);
	    } else {
	        return this.getTypedRuleContext(NameAndArgsContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterPrefixexp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitPrefixexp(this);
		}
	}


}



class FunctioncallContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_functioncall;
    }

	varOrExp() {
	    return this.getTypedRuleContext(VarOrExpContext,0);
	};

	nameAndArgs = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(NameAndArgsContext);
	    } else {
	        return this.getTypedRuleContext(NameAndArgsContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterFunctioncall(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitFunctioncall(this);
		}
	}


}



class VarOrExpContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_varOrExp;
    }

	var_() {
	    return this.getTypedRuleContext(VarContext,0);
	};

	exp() {
	    return this.getTypedRuleContext(ExpContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterVarOrExp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitVarOrExp(this);
		}
	}


}



class VarContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_var;
    }

	NAME() {
	    return this.getToken(LuaParser.NAME, 0);
	};

	exp() {
	    return this.getTypedRuleContext(ExpContext,0);
	};

	varSuffix = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(VarSuffixContext);
	    } else {
	        return this.getTypedRuleContext(VarSuffixContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterVar(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitVar(this);
		}
	}


}



class VarSuffixContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_varSuffix;
    }

	exp() {
	    return this.getTypedRuleContext(ExpContext,0);
	};

	NAME() {
	    return this.getToken(LuaParser.NAME, 0);
	};

	nameAndArgs = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(NameAndArgsContext);
	    } else {
	        return this.getTypedRuleContext(NameAndArgsContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterVarSuffix(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitVarSuffix(this);
		}
	}


}



class NameAndArgsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_nameAndArgs;
    }

	args() {
	    return this.getTypedRuleContext(ArgsContext,0);
	};

	NAME() {
	    return this.getToken(LuaParser.NAME, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterNameAndArgs(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitNameAndArgs(this);
		}
	}


}



class ArgsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_args;
    }

	explist() {
	    return this.getTypedRuleContext(ExplistContext,0);
	};

	tableconstructor() {
	    return this.getTypedRuleContext(TableconstructorContext,0);
	};

	string() {
	    return this.getTypedRuleContext(StringContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterArgs(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitArgs(this);
		}
	}


}



class FunctiondefContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_functiondef;
    }

	funcbody() {
	    return this.getTypedRuleContext(FuncbodyContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterFunctiondef(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitFunctiondef(this);
		}
	}


}



class FuncbodyContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_funcbody;
    }

	block() {
	    return this.getTypedRuleContext(BlockContext,0);
	};

	parlist() {
	    return this.getTypedRuleContext(ParlistContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterFuncbody(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitFuncbody(this);
		}
	}


}



class ParlistContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_parlist;
    }

	namelist() {
	    return this.getTypedRuleContext(NamelistContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterParlist(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitParlist(this);
		}
	}


}



class TableconstructorContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_tableconstructor;
    }

	fieldlist() {
	    return this.getTypedRuleContext(FieldlistContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterTableconstructor(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitTableconstructor(this);
		}
	}


}



class FieldlistContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_fieldlist;
    }

	field = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(FieldContext);
	    } else {
	        return this.getTypedRuleContext(FieldContext,i);
	    }
	};

	fieldsep = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(FieldsepContext);
	    } else {
	        return this.getTypedRuleContext(FieldsepContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterFieldlist(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitFieldlist(this);
		}
	}


}



class FieldContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_field;
    }

	exp = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpContext);
	    } else {
	        return this.getTypedRuleContext(ExpContext,i);
	    }
	};

	NAME() {
	    return this.getToken(LuaParser.NAME, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterField(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitField(this);
		}
	}


}



class FieldsepContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_fieldsep;
    }


	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterFieldsep(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitFieldsep(this);
		}
	}


}



class OperatorOrContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_operatorOr;
    }


	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterOperatorOr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitOperatorOr(this);
		}
	}


}



class OperatorAndContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_operatorAnd;
    }


	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterOperatorAnd(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitOperatorAnd(this);
		}
	}


}



class OperatorComparisonContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_operatorComparison;
    }


	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterOperatorComparison(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitOperatorComparison(this);
		}
	}


}



class OperatorStrcatContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_operatorStrcat;
    }


	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterOperatorStrcat(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitOperatorStrcat(this);
		}
	}


}



class OperatorAddSubContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_operatorAddSub;
    }


	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterOperatorAddSub(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitOperatorAddSub(this);
		}
	}


}



class OperatorMulDivModContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_operatorMulDivMod;
    }


	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterOperatorMulDivMod(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitOperatorMulDivMod(this);
		}
	}


}



class OperatorBitwiseContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_operatorBitwise;
    }


	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterOperatorBitwise(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitOperatorBitwise(this);
		}
	}


}



class OperatorUnaryContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_operatorUnary;
    }


	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterOperatorUnary(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitOperatorUnary(this);
		}
	}


}



class OperatorPowerContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_operatorPower;
    }


	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterOperatorPower(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitOperatorPower(this);
		}
	}


}



class NumberContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_number;
    }

	INT() {
	    return this.getToken(LuaParser.INT, 0);
	};

	HEX() {
	    return this.getToken(LuaParser.HEX, 0);
	};

	FLOAT() {
	    return this.getToken(LuaParser.FLOAT, 0);
	};

	HEX_FLOAT() {
	    return this.getToken(LuaParser.HEX_FLOAT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterNumber(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitNumber(this);
		}
	}


}



class StringContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_string;
    }

	NORMALSTRING() {
	    return this.getToken(LuaParser.NORMALSTRING, 0);
	};

	CHARSTRING() {
	    return this.getToken(LuaParser.CHARSTRING, 0);
	};

	LONGSTRING() {
	    return this.getToken(LuaParser.LONGSTRING, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.enterString(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LuaListener ) {
	        listener.exitString(this);
		}
	}


}




LuaParser.ChunkContext = ChunkContext; 
LuaParser.BlockContext = BlockContext; 
LuaParser.StatContext = StatContext; 
LuaParser.LaststatContext = LaststatContext; 
LuaParser.LabelContext = LabelContext; 
LuaParser.FuncnameContext = FuncnameContext; 
LuaParser.VarlistContext = VarlistContext; 
LuaParser.NamelistContext = NamelistContext; 
LuaParser.ExplistContext = ExplistContext; 
LuaParser.ExpContext = ExpContext; 
LuaParser.PrefixexpContext = PrefixexpContext; 
LuaParser.FunctioncallContext = FunctioncallContext; 
LuaParser.VarOrExpContext = VarOrExpContext; 
LuaParser.VarContext = VarContext; 
LuaParser.VarSuffixContext = VarSuffixContext; 
LuaParser.NameAndArgsContext = NameAndArgsContext; 
LuaParser.ArgsContext = ArgsContext; 
LuaParser.FunctiondefContext = FunctiondefContext; 
LuaParser.FuncbodyContext = FuncbodyContext; 
LuaParser.ParlistContext = ParlistContext; 
LuaParser.TableconstructorContext = TableconstructorContext; 
LuaParser.FieldlistContext = FieldlistContext; 
LuaParser.FieldContext = FieldContext; 
LuaParser.FieldsepContext = FieldsepContext; 
LuaParser.OperatorOrContext = OperatorOrContext; 
LuaParser.OperatorAndContext = OperatorAndContext; 
LuaParser.OperatorComparisonContext = OperatorComparisonContext; 
LuaParser.OperatorStrcatContext = OperatorStrcatContext; 
LuaParser.OperatorAddSubContext = OperatorAddSubContext; 
LuaParser.OperatorMulDivModContext = OperatorMulDivModContext; 
LuaParser.OperatorBitwiseContext = OperatorBitwiseContext; 
LuaParser.OperatorUnaryContext = OperatorUnaryContext; 
LuaParser.OperatorPowerContext = OperatorPowerContext; 
LuaParser.NumberContext = NumberContext; 
LuaParser.StringContext = StringContext; 
