export function fib(n: number): number {
  if (n <= 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
}

type AnyFunction = (...args: any[]) => any;

function higherOrder<Fn extends AnyFunction>(fn: Fn, label: string) {
  return (...args: Parameters<Fn>): ReturnType<Fn> => {
    const start = Date.now();
    const val = fn(...args);
    console.log(label, Date.now() - start);
    return val;
  };
}

export const timedFib = higherOrder(fib, "Time spent on fib");

function delayedSum(a: number, b: number): Promise<number> {
  const sum = a + b;
  return new Promise((resolve) => setTimeout(() => resolve(sum), sum));
}

function asyncHigherOrder<Fn extends AnyFunction>(fn: Fn, label: string) {
  return async (...args: Parameters<Fn>): Promise<Awaited<ReturnType<Fn>>> => {
    const start = Date.now();
    const val = await fn(...args);
    console.log(label, Date.now() - start);
    return val;
  };
}

export async function delayedSumWithLabel() {
  const timedSum = asyncHigherOrder(delayedSum, "sum");
  console.log(await timedSum(1000, 1500));
}
