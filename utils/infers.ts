import { Equal } from "@type-challenges/utils";

//after Awaited, this is no longer needed for primitives
// type MyAwaited<T extends Promise<unknown>> = Awaited<T>;

//infer for primitives
// type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer V> ? V : never;

//recursive MyAwaited for multiple promises
type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer V>
  ? V extends Promise<unknown>
    ? MyAwaited<V>
    : V
  : never;

type X = Promise<Promise<string>>;

export type equals = MyAwaited<X>;

//Includes Type for Arrays with infer
type Includes<T extends readonly any[], U> = T extends [infer F, ...infer R]
  ? Equal<U, F> extends true
    ? true
    : Includes<R, U>
  : false;

type Testit = Includes<["Kars", "Esidisi", "Wamuu"], "Wamuu">;

//Implementing Parameters type with infer
type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer A
) => any
  ? A
  : never;

const foo = (arg1: string, arg2: number): void => {};
type check = MyParameters<typeof foo>;

//Check first param
type FirstParameter<T extends (...args: any[]) => any> = T extends (firstParam: infer A, ...args: any[]) => any ? A: never;
type SecondParam<T extends (...args: any[]) => any> = T extends (firstParam: any, secondParam: infer A, ...args: any[]) => any ? A: never;
type checkFirstParam = FirstParameter<typeof foo>;
type checkSecondParam = SecondParam<typeof foo>;

//Implementing ReturnType type with infer
type MyReturnType<T> = T extends (...args: any[])=> infer R ? R : never;
const tryFunction = ()=>true;
type OriginalReturnType = ReturnType<typeof tryFunction>;
type MyOwnReturnType = MyReturnType<typeof tryFunction>

//implementing a Trim type
//Chars check not only for spaces but also new lines and tabs
type Chars = ' ' | '\n' | '\t';

type Trim<S extends string | number> = S extends `${Chars}${infer SS}` ? Trim <SS> : S extends `${infer SS}${Chars}` ? Trim<SS> : S;

type Trimmed = Trim<' string '>