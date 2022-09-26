import React, { ReactElement } from "react";

import classes from "./Loader.module.css";

const Loader:React.FC = ():ReactElement => {
  return (
    <>
      <label htmlFor="" className={classes.label}>
        <div 
          className={classes.checkIcon}>
          </div>
      </label>
    </>
  );
};

export default Loader;
