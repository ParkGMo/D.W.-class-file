import React from "react";
import logoImg from "../assets/logo.png";
import styles from "./Nav.module.css";
import cn from "classnames";

function Nav({ className }) {
  return (
    <div className={cn(styles.logo, className)}>
      <img src={logoImg} />
    </div>
  );
}

export default Nav;
