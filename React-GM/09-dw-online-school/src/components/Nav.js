import React from "react";
import Container from "./Container";
import { Link, NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
import cn from "classnames";
import UserMenu from "./UserMenu";

function Nav({ className }) {
  function getLinkStyle({ isActive }) {
    // 함수의 파라미터로 isActive, isPending, isTransitioning이 넘어온다.
    return {
      // textDecoration: isActive ? " underline" : undefined,
      backgroundColor: isActive ? "#545454" : undefined,
      color: isActive ? "white" : undefined,
      padding: isActive ? "10px" : undefined,
      borderRadius: isActive ? "12px" : undefined,
    };
  }

  return (
    <div className={styles.nav}>
      <Container className={styles.container}>
        <Link to="/">
          <div className={styles.logo}>
            <span>DW</span>
            os
          </div>
        </Link>
        <ul className={styles.menu}>
          <li>
            <NavLink to="/courses" style={getLinkStyle}>
              카탈로그
            </NavLink>
          </li>
          <li>
            <NavLink to="/questions" style={getLinkStyle}>
              커뮤니티
            </NavLink>
          </li>
          <li>
            <UserMenu />
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Nav;
