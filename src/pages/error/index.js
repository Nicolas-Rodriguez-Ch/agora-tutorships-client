import React from "react";
import styles from "../../assets/styles/pages/errorPage.module.scss";
import { Player } from "@lottiefiles/react-lottie-player";

function ErrorPage() {
  return (
    <div className={styles.errorPage}>
      <Player
        autoplay
        loop
        src="https://assets2.lottiefiles.com/packages/lf20_ck8dimsp.json"
        className={styles.errorIllustration}
      />
    </div>
  );
}

export default ErrorPage;
