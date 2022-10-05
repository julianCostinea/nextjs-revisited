//before adding generics it looks like this
export const getDeepValueOriginal = (obj: any, firstKey: string, secondKey: string) => {
  return obj[firstKey][secondKey];
};

const objOriginal = {
    foo: {
        a: true,
        b: 2
    },
    bar: {
        c: "12",
        d: 18
    }
}

const valueOriginal = getDeepValueOriginal(objOriginal, "foo", "a")

//after adding generics
export const getDeepValue = <TObj, TFirstKey extends keyof TObj, TSecondKey extends keyof TObj[TFirstKey]>(
    obj: TObj,
    firstKey: TFirstKey,
    secondKey: TSecondKey
  ) => {
    return obj[firstKey][secondKey];
  };
  
  const obj = {
    foo: {
      a: true,
      b: 2,
    },
    bar: {
      c: "12",
      d: 18,
    },
  };
  
  export const value = getDeepValue(obj, "bar", "d");

//returnType with generics
const returnWhatIPassIn = <TVal>(val: TVal)=>{
    return val;
}
const result = returnWhatIPassIn("a");