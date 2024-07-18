import React from "react";
import styles from "./Button.module.css";
import cn from "classnames";

function Button({ variant, ...restPorps }) {
  debugger;
  return (
    <button
      {...restPorps}
      className={cn(styles.button, variant && styles[variant])}
      // children={children}
    />
  );
}

export default Button;
