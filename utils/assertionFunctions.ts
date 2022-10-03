type AssertIsString = (value: unknown) => asserts value is string;
type Name = string;
type AssertIsName = (value: unknown) => asserts value is Name;
type AssertHasProps = <Prop extends string>(
  props: ReadonlyArray<Prop>,
  value: object
) => asserts value is Record<Prop, unknown>;

// Function expression with predefined type
const assertIsString: AssertIsString = (value) => {
  if (typeof value !== "string") throw Error("value is not a string");
};

// Function expression with predefined type
const assertIsName: AssertIsName = (value) => {
  if (typeof value !== "string") throw Error("Name is not a string");
  if (value.trim() === "") throw Error("Name is empty");
  if (value.length < 3) throw Error("Name is too short");
  if (value.length > 256) throw Error("Name is too long");
};

export const capitalizeString = (value: string | number) => {
  assertIsString(value);
  return value.toUpperCase();
};

// Function expression with predefined type
const assertHasProps: AssertHasProps = (props, value) => {
  // Only objects have properties
  if (typeof value !== "object") throw Error(`Value is not an object`);

  // Make sure it's not null
  if (value === null) {
    throw Error("Value is null");
  }

  // Check if it has the expected properties
  for (const prop of props)
    if (prop in value === false) throw Error(`Value doesn't have .${prop}`);
};

export const assertValueHasProps = (value: unknown): string => {
  if (typeof value !== "object") throw Error("Value is not an object");
  if (value === null) throw Error("Value is null");

  assertHasProps(["name", "email", "password"], value);
  //   if (typeof value.email === "string") {
  //     return value.email;
  //   }
  assertIsString(value.email);
  return value.email;
};

//assertions directly with conditions
type Assert = (condition: unknown) => asserts condition;
const assert: Assert = (condition) => {
  if (condition == false) throw "Invalid assertion";
};
const x = "abc" as string | number;
x; // <- x: `string | number`

assert(typeof x === "string");
x;// <- x: `string`
