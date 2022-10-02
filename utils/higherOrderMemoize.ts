export type AnyFunction = (...args: any[]) => any;

function memoize<Fn extends AnyFunction>(
  fn: Fn,
  toKey: (...args: Parameters<Fn>) => string
) {
  const values: Record<string, ReturnType<Fn>> = {};

  return function (...args: Parameters<Fn>): ReturnType<Fn> {
    const key = toKey(...args);
    if (values[key]) {
      return values[key];
    }
    const val = fn(...args);
    values[key] = val;
    return val;
  };
}

const fib = function fib(n: number): number {
  if (n <= 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
};

const fib2 = memoize(
  function fib(n: number): number {
    if (n <= 0) {
      return 0;
    }
    if (n === 1) {
      return 1;
    }
    return fib(n - 1) + fib(n - 2);
  },
  (n) => n.toString()
);

function latency<Fn extends AnyFunction>(fn: Fn, label: string) {
  return (...args: Parameters<Fn>): ReturnType<Fn> => {
    const start = Date.now();
    const val = fn(...args);
    console.log(label, Date.now() - start);
    return val;
  };
}

export const fibTimed = latency(fib, "Fib");
export const fib2Timed = latency(fib2, "FibMemo");