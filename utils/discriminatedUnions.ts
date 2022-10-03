export type Log = Warning | Comment | Information;

interface Warning {
  subscribeToTheNewsletter: "warning";
  text: string;
}

interface Comment {
  subscribeToTheNewsletter: "comment";
  message: string;
}

interface Information {
  subscribeToTheNewsletter: "information";
  info: string;
}

export const formatErrorMessage = (value: Log): string => {
  //   if (value.subscribeToTheNewsletter === "warning") {
  //     return `warning: ${value.text}`;
  //   } else if (value.subscribeToTheNewsletter === "comment") {
  //     return `comment: ${value.message}`;
  //   } else if (value.subscribeToTheNewsletter === "information") {
  //     return `info: ${value.info}`;
  //   }
  switch (value.subscribeToTheNewsletter) {
    case "warning":
      return `warning: ${value.text}`;
    case "comment":
      return `comment: ${value.message}`;
    case "information":
      return `info: ${value.info}`;
  }

  // We will never reach here
  throw new Error(`Invalid value type`);
};
