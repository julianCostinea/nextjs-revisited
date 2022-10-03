type AssertIsString = (value: unknown) => asserts value is string;
const assertIsString: AssertIsString = (value) => {
  if (typeof value !== "string") throw Error("value is not a string");
};

export const isStringAsync =
  async (value: unknown): Promise<(v: unknown) => v is string> =>
  (v): v is string =>
    typeof value === "string";

const aaa = 1 as number | string | Date;
isStringAsync(aaa).then((isString) => {
  if (isString(aaa)) {
    aaa; // <- aaa: string
  } else {
    aaa; // <- aaa: string | number | Date
  }
});

async function emailIsAlreadyTaken(email: string) {
  //if database finds email return true
  return false;
}

interface User {
  email: string;
  password: string;
}
type PasswordValidated<T> = T & {
  __passwordValidated__: true;
};

type UniqueEmailValidated<T> = T & {
  __uniqueEmailValidated__: true;
};

type ValidatedUser = PasswordValidated<User> & UniqueEmailValidated<User>;

type ValidateUser = (
  value: unknown
) => asserts value is PasswordValidated<User> & UniqueEmailValidated<User>;

const validateUserAsync = async (value: any): Promise<ValidateUser> => {
  // If we throw an error, save it to throw later, in the assertion function
  let errorToThrow: Error | null = null;

  try {
    assertIsString(value.email);
    assertIsString(value.password);

    // 1. The password should have at least 8 characters
    if (value.password.length < 8) throw Error("Password is too short");

    // 2. The email cannot already belong to another user
    if (await emailIsAlreadyTaken(value.email))
      throw Error("Email is already taken");
  } catch (error) {
    console.error(error);
  }

  return (v) => {
    if (errorToThrow) throw errorToThrow;
  };
};

const saveUserToDatabase = async (
  validUser: ValidatedUser
): Promise<void> => {
    //save user in the database
};

let user: unknown;
(async function validateBeforeSave() {
  const validateUser: ValidateUser = await validateUserAsync(user);
  validateUser(user);
  await saveUserToDatabase(user);
})();
