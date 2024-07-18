import React from "react";
import styles from "./Button.module.css";
import cn from "classnames";

function Button({ variant, onClick, ...restProps }) {
  return (
    <button
      {...restProps}
      className={cn(styles.button, variant && styles[variant])}
      onClick={onClick}
    />
  );
}

export default Button;
