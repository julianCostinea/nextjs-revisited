import {isNumber } from "./typeGuards";

//manualy creating isNot functions
const isNotString = <V extends unknown>(
  value: V
): value is Exclude<V, string> => isString(value) === false;

const isNotNumber = <V extends unknown>(
  value: V
): value is Exclude<V, number> => isNumber(value) === false;

export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

type PredicateFunction<T = any> = (v: unknown) => v is T;

type UnpackPredicateFunction<F extends PredicateFunction> = F extends PredicateFunction<infer T> ? T : never;

type MakeIsNot = <F extends PredicateFunction>(fn: F) => <V extends Parameters<F>[0] = Parameters<F>[0]>(v: V) => v is Exclude<V, UnpackPredicateFunction<F>>;

const makeIsNot: MakeIsNot = (fn) => ((v:unknown) => !fn(v)) as any;

export const isNotString2 = makeIsNot(isString);

// type MakeIsNot = {
//     /**
//      * Creates an inversed `PredicateFunction` from an existing `PredicateFunction`.
//      *
//      * @example
//      * ```ts
//      * const isNumber = (v: any): v is number => typeof v === 'number';
//      *
//      * // The following expressions are equivalent:
//      * const isNotNumber = makeIsNot(isNumber);
//      * const isNotNumber = <V>(v: V): v is Exclude<V, number> => isNumber(v) === false;
//      * ```
//      *
//      * @param fn Predicate function to inverse
//      */
//     <F extends PredicateFunction>(fn: F): <V extends Parameters<F>[0] = Parameters<F>[0]>(v: V,) => v is Exclude<V, UnpackPredicateFunction<F>>
  
//     /**
//      * Creates an inversed `UnguardedPredicateFunction` from an existing
//      * `UnguardedPredicateFunction`.
//      *
//      * @example
//      * ```ts
//      * const isEqual = (a: number, b: number): boolean => a === b;
//      *
//      * // The following expressions are equivalent:
//      * const isNotEqual = makeIsNot(isEqual);
//      * const isNotEqual = (a: number, b: number): boolean => isEqual(a, b) === false;
//      * ```
//      *
//      * @param fn Unguarded predicate function to inverse
//      */
//      
//     type UnguardedPredicateFunction<Params extends Array<any> = Array<any>> = (...args: Params) => boolean
//
//     <F extends UnguardedPredicateFunction>(fn: F): (...args: Parameters<F>) => ReturnType<F> extends true ? false : ReturnType<F> extends false ? true : boolean
//   }
// const makeIsNot: MakeIsNot = (fn: (...args: Array<any>) => any) => ((...args: Array<any>) => !fn(...args)) as any

type UnguardedPredicateFunction<Params extends Array<any> = Array<any>> = (...args: Params) => boolean;
// type MakeIsNot = <F extends PredicateFunction>(fn: F) => <V extends Parameters<F>[0] = Parameters<F>[0]>(v: V) => v is Exclude<V, UnpackPredicateFunction<F>>;
type MakeIsNot2 = <F extends UnguardedPredicateFunction>(fn: F)=> (...args: Parameters<F>) => ReturnType<F> extends true ? false : ReturnType<F> extends false ? true : boolean;

const isEqual = (a: number, b: number): boolean => a === b;
const makeIsNot2: MakeIsNot2 = (fn: (...args: Array<any>) => any) => ((...args: Array<any>) => !fn(...args)) as any
const isNotEqual = makeIsNot2(isEqual);
// * const isNotEqual = (a: number, b: number): boolean => isEqual(a, b) === false;