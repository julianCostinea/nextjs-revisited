export const formatErrorMessage = (
  value: null | undefined | string | Error | Warning
): string => {
  const prefix = "Error: ";

  // If it's falsy (null, undefined, empty string), return "Unknown" with the prefix
  if (isFalsy(value)) {
    return prefix + "Unknown";
  }

  // If it's a string, return the string with the prefix
  if (isString(value)) {
    return prefix + value;
  }

  // If it's a Warning, return the Warning.text with the prefix
  if (isWarning(value)) {
    return prefix + value.text;
  }
  //   if ("text" in value) {
  //     return prefix + value.text;
  //   }

  // If it's an Error, return the Error.message with the prefix
  if (isError(value)) {
    return prefix + value.message;
  }

  // We will never reach here
  throw new Error(`Invalid value type`);
};

type Falsy = false | 0 | -0 | 0n | "" | null | undefined;

interface Warning {
  text: string;
}
export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === "number";
};

const isError = (value: unknown): value is Error => {
  return value instanceof Error;
};
// const isWarning = (value: unknown): value is Warning =>
//   typeof value === "object" && value !== null && "text" in value;
const isWarning = (value: unknown): value is Warning => {
  if (typeof value === "object" && value != null && "text" in value) {
    return true;
  }
  return false;
};

const isFalsy = (value: unknown): value is Falsy => {
  return value == false;
};

type Truthy<T> = Exclude<T, Falsy>;

const isTruthy = <T extends unknown>(value: T): value is Truthy<T> => value == true;

const x = "abc" as null | string | 0;
if (isTruthy(x)) {
  x.trim(); // `x: string`
}
