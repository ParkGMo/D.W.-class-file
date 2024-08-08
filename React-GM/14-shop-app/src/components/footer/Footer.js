import React from "react";
import "./Footer.module.scss";
import { Link } from "react-router-dom";
import { BsGithub } from "react-icons/bs";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.contacts}>
          <Link
            to={
              "https://github.com/ParkGMo/D.W.-class-file/tree/main/React-GM/13-redux_practice"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsGithub />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
