type AnyFunction = (...args: any[]) => any;

function higherOrderErrorHandler<Fn extends AnyFunction>(fn: Fn, errHandler?: (e:any)=>void) {
    return (...args: Parameters<Fn>): ReturnType<Fn> | void => {
      try{
        return fn(...args);
      } catch(err){
        errHandler?.(err);
      }
    };
  }

function sum(a: number, b: number):number{
    const c = a + b;
    if (c>10) {
        throw "too high";
    }
    return c;
}

export const errorHandlerSum = higherOrderErrorHandler(sum, console.warn);

const metricsClient = {
    increment: (key: string) =>console.log(`incr metric: ${key}`)
}
function metric<Fn extends AnyFunction>(fn: Fn, metricName: string){
    return (...args: Parameters<Fn>): ReturnType<Fn>=>{
        metricsClient.increment(metricName)
        return fn(...args);
    }
}

const labelFn = (label:string)=>(fn:AnyFunction)=>metric(fn, `${label}: ${fn.name}`);
export const deprecated = labelFn('deprecated');
export let sum2 = (a:number, b:number)=> a + b;
