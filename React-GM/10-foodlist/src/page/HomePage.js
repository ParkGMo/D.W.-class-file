import React from "react";
import Card from "../components/Card";
import styles from "./HomePage.module.css";

function HomePage(props) {
  return (
    <div>
      <Card>
        <div className={styles.addBox}>
          <div className={styles.imgInputBox}>
            <input className={styles.inputImg} type="file" />
          </div>
          <div className={styles.containerBox}>
            <div className={styles.titleBox}>
              <input />
              <button />
            </div>
            <div className={styles.contentBox}>
              <input />
            </div>
          </div>
        </div>
      </Card>
      <div>searchBox</div>
      <div>catalLog</div>
      <div>list</div>
    </div>
  );
}

export default HomePage;
