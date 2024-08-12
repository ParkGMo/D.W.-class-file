import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiUser, FiLogIn } from "react-icons/fi";
import { GoSignOut } from "react-icons/go";
import styles from "./Nav.module.scss";
import NavCartBlock from "./nav-cart-block/NavCartBlock";

function Nav() {
  const listCount = JSON.parse(localStorage.getItem("cartProducts"));

  return (
    <nav className={styles.nav}>
      {/* {listCount && <div className={styles.count}>{listCount.length}</div>} */}
      <ul>
        <li>
          <div className={styles.counter}>
            <Link>
              <FiShoppingCart />
            </Link>
            <b>3</b>
            <div className={styles.nav_hover_cart}>
              <NavCartBlock />
            </div>
          </div>
        </li>
        <li>
          <div>
            <Link>
              <FiUser />
            </Link>
          </div>
        </li>
        <li>
          <div>
            <Link>
              <FiLogIn />
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
