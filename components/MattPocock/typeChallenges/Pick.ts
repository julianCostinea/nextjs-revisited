import type {Equal, Expect} from "@type-challenges/utils";

type MyPick<TObj, TKey extends keyof TObj> = {
    [SpecificKey in TKey] : TObj[SpecificKey]
};

interface Todo{
    title: string,
    description: string,
    completed: boolean
}

type implementMyPick = MyPick<Todo, "description">