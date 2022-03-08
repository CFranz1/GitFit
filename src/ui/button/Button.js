import React from "react";
import classes from "./Button.module.css";

const Button = ({
  type,
  style,
  id,
  isDisabled = false,
  onClickHandler,
  children,
}) => {
  onClickHandler = onClickHandler || function (event) {};
  return (
    <button
      type={type}
      id={id}
      onClick={onClickHandler}
      className={`${classes.button} ${classes[style]}`}
      disabled={isDisabled}
    > {children}
    </button>
  );
};

export default Button;