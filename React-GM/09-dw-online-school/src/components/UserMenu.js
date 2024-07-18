import React, { useEffect, useState } from "react";
import personImg from "../assets/person.png";
import styles from "./UserMenu.module.css";
import { Link } from "react-router-dom";

function UserMenu(props) {
  const [isOpen, setIsOpen] = useState(false);
  const member = JSON.parse(localStorage.getItem("member"));
  const [islogined, setIslogined] = useState(member ? true : false);
  const handleClick = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
    // if (isOpen === false) {
    //   setIsOpen(true);
    // } else if (isOpen === true) {
    //   setIsOpen(false);
    // }
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = () => {
      setIsOpen(false);
    };

    window.addEventListener("click", handleClickOutside, false);
    return () => {
      window.removeEventListener("click", handleClickOutside, false);
    };
  }, [isOpen]);

  return (
    <div className={styles.userMenu}>
      <button className={styles.iconButton}>
        <img src={personImg} onClick={handleClick} />
      </button>
      {isOpen && (
        <ul className={styles.popup}>
          <Link to="/wishlist">
            <li>위시리스트</li>
          </Link>
          <li className={styles.disabled}>회원가입</li>
          {!islogined ? (
            <Link to="/login">
              <li>로그인</li>
            </Link>
          ) : (
            <Link to="/login">
              <li>로그아웃</li>
            </Link>
          )}
        </ul>
      )}
    </div>
  );
}

export default UserMenu;
