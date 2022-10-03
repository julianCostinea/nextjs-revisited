type AsyncFunction = (...args: any[]) => Promise<any>;

type CacheReturn<Fn extends AsyncFunction> = 
((...args: Parameters<Fn>
) => Promise<Awaited<ReturnType<Fn>>>) & {
  invalidate: (...args: Parameters<Fn>) => void;
};

function cache<Fn extends AsyncFunction>(
  fn: Fn,
  getKey: (...args: Parameters<Fn>) => string
): CacheReturn<Fn> {
    const cache: Record<string, Awaited<ReturnType<Fn>>> = {};

    const retFn = async (...args: Parameters<Fn>): Promise<Awaited<ReturnType<Fn>>> =>{
        const key = getKey(...args);
        if (!cache[key]) {
            cache[key] = await fn(...args);
        }
        return cache[key];
    } 
    retFn.invalidate = (...args: Parameters<Fn>)=>{
        console.log("Invalidating", ...args);
        delete cache[getKey(...args)];
    };
    return retFn;
}

export const sumAndLog = cache((a: number, b: number):Promise<number>=>{
  console.log("running original function");
  return Promise.resolve(a+b);
}, (a,b)=>`${a}${b}`);
