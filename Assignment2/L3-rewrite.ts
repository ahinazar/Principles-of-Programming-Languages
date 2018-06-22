import { filter, map, reduce, zip } from "ramda";
import { first, isArray, isBoolean, isEmpty, isNumber, isString, rest, second, isLetStarExp, makeLetExp, makeLetStarExp, LetStarExp, LetExp, makeProgram, makeDefineExp, isVarDecl, makeBinding, isBinding, isAtomicExp, Binding, isCompoundExp, safeF, safeFL } from "./L3-ast";
import { AppExp, AtomicExp, BoolExp, CompoundExp, CExp, DefineExp, Exp, IfExp, LitExp, NumExp,
         Parsed, PrimOp, ProcExp, Program, StrExp, VarDecl, VarRef } from "./L3-ast";
import { allT, getErrorMessages, hasNoError, isError }  from "./L3-ast";
import { isAppExp, isBoolExp, isCExp, isDefineExp, isExp, isIfExp, isLetExp, isLitExp, isNumExp,
             isPrimOp, isProcExp, isProgram, isStrExp, isVarRef } from "./L3-ast";
import { makeAppExp, makeBoolExp, makeIfExp, makeLitExp, makeNumExp, makeProcExp, makeStrExp,
         makeVarDecl, makeVarRef } from "./L3-ast";
import { parseL3 } from "./L3-ast";
import { isClosure, isCompoundSExp, isEmptySExp, isSymbolSExp, isSExp,
         makeClosure, makeCompoundSExp, makeEmptySExp, makeSymbolSExp,
         Closure, CompoundSExp, SExp, Value } from "./value";

export const rewriteLetStar = (cexp: Parsed | Error) : LetExp  | Error => {
    return isLetStarExp(cexp) ? safeFL( (array1:Binding[])=>safeFL((array2:CExp[])=>makeLetExp(array1,array2))
                                    ( (rest(cexp.bindings).length > 0) ? 
                                        [rewriteLetStar(makeLetStarExp(rest(cexp.bindings),cexp.body))] : 
                                        cexp.body ))
                                    (  [first(cexp.bindings)] ): 
    Error("Not an LetStar expression " + cexp);
}

export const rewriteAllLetStar = (cexp: Parsed | Binding | Error) : Parsed | Binding | Error =>{
    return isAtomicExp(cexp) ? cexp :
           isVarDecl(cexp) ? cexp:
           isError(cexp) ? cexp:
           isLitExp(cexp) ? cexp :
           isProgram(cexp) ? safeFL((array:CExp[])=>makeProgram(array))(map(rewriteAllLetStar,cexp.exps)):
           isDefineExp(cexp) ? safeF((express:CExp)=>makeDefineExp(cexp.var,cexp.val))(safeCast(rewriteAllLetStar(cexp.val))):
           isAppExp(cexp) ? safeFL((array:CExp[])=>makeAppExp(cexp.rator,array))(map(rewriteAllLetStar, cexp.rands)) :
           isIfExp(cexp) ? safeFL((array:CExp[])=>makeIfExp(array[0],array[1],array[2]))(map(rewriteAllLetStar,[cexp.test,cexp.then,cexp.alt])) : 
           isProcExp(cexp) ? safeFL( (array:CExp[])=>makeProcExp(cexp.args,array) )(map(rewriteAllLetStar,cexp.body)) :
           isBinding(cexp) ? safeF((express:CExp)=>makeBinding(cexp.var,express))(safeCast(rewriteAllLetStar(cexp.val))):   
           isLetExp(cexp) ? safeFL( (array1:Binding[])=>safeFL((array2:CExp[])=>makeLetExp(array1,array2))(map(rewriteAllLetStar,cexp.body)))(map(rewriteAllLetStar,cexp.bindings)):
           isLetStarExp(cexp) ? rewriteLetStar(safeFL( (array1:Binding[])=>safeFL((array2:CExp[])=>makeLetStarExp(array1,array2))(map(rewriteAllLetStar,cexp.body)))(map(rewriteAllLetStar,cexp.bindings))):
           Error("Not an LetStar expression " + cexp);
}

export const safeCast:(cexp:any)=>CExp|Error = (cexp) => {
    if(isCExp(cexp) || isError(cexp)) 
        return cexp;
    else
        return Error();
}