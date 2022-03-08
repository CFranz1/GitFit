import React from "react";
import classes from "./TextField.module.css";

const TextField = ({
  type,
  id,
  placeholder,
}) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className={`${classes.input}`}
    >
    </input>
  );
};

export default TextField;