import React from "react";
import Container from "./Container";
import styles from "./ListPage.module.css";
import catalogImg from "../assets/catalog.svg";
import cn from "classnames";

function ListPage({ $catalog, head, text }) {
  return (
    <>
      <div
        className={
          $catalog
            ? cn(styles.bg, styles.catalog)
            : cn(styles.bg, styles.community)
        }
      >
        <img className={styles.icon} src={catalogImg} />
        <div className={styles.texts}>
          <h1 className={styles.heading}>{head}</h1>
          <p className={styles.description}>{text}</p>
        </div>
      </div>
      <Container className={styles.container}></Container>
    </>
  );
}

export default ListPage;
