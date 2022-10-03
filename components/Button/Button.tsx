import React, {ReactElement } from "react";

import classes from "./Button.module.scss";

export interface IProps {
  buttonText: string;
}

const Button: React.FC<IProps> = ({ buttonText }): ReactElement => {
  return (
      <button className={classes.button} type="button">
        {buttonText}
      </button>
  );
};
export default Button;
