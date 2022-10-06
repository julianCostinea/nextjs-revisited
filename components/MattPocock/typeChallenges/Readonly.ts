import type {Equal, Expect} from "@type-challenges/utils";

type MyReadonly<TInput> = {
    readonly [Key in keyof TInput]: TInput[Key]
}
//for objects (recursively) as well
// type MyReadonly<TInput> = {
//     readonly [Key in keyof TInput]: TInput[Key] extends object ? MyReadonly<TInput[Key]> : TInput[Key]
// }

type Result = MyReadonly<Todo1>

interface Todo1 {
    title: string
    description: string
    completed: boolean
    meta: {
      author: string
    }
  }

  type cases = [
    Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>,
  ]