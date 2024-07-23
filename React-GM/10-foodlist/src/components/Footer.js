import React from "react";
import styles from "./Footer.module.css";
import cn from "classnames";

function Footer({ className }) {
  return (
    <div className={className}>
      <div className={styles.logoLang}>
        <div>Foodit</div>
        <select className="LocaleSelect">
          <option value="ko">한국어</option>
          <option value="en">English</option>
        </select>
      </div>
      <div>서비스 이용약관 | 개인정보 처리방침 </div>
    </div>
  );
}

export default Footer;
