import { CExp, Exp, PrimOp, Program, DefineExp } from "./L1-ast";
import { hasError, isAppExp, isBoolExp, isCExp, isDefineExp, isError, isNumExp, isPrimOp,
         isProgram, isVarRef, isVarDecl } from "./L1-ast";
import { parseL1 } from "./L1-ast";
import { first, isEmpty, rest } from "./L1-ast";
import * as assert from "assert";
import { filter, map, reduce } from "ramda";
import { isNumber } from "./L3-ast";

// Implement the following function:
export const unparse = (x: Program | DefineExp | CExp) : string | Error => {
    if(isProgram(x)){
        return "(L1"+  x.exps.reduce((acc,curr)=>acc+" "+unparse(curr) , "" ) + ")";
    }else if(isDefineExp(x)){
        return "(define "+ unparse(x.var) + " " + unparse(x.val) + ")";
    }else if(isCExp(x)){
        if(isNumExp(x)){
            return x.val.toString();
        }
        else if (isBoolExp(x)){
            if(x.val)
                return "#t";
            else
                return "#f";
        }
        else if(isVarRef(x) || isVarDecl(x))
            return x.var;
        else if(isPrimOp(x))
            return x.op;
        else if(isAppExp(x))
            return "("+ unparse(x.rator) + x.rands.reduce((acc,curr)=>acc+" "+unparse(curr) , "")  + ")";
    }else
        return Error("Invalid AST");
}
