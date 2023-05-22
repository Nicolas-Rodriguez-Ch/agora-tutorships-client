import React from "react";
import styles from "../assets/styles/components/LandigPageDescription.module.scss";
import { Player } from "@lottiefiles/react-lottie-player";

function LandingPageDescription() {
  return (
    <>
      <section className={styles.descriptionMainContainer}>
        <section className={styles.descriptionMainTextContainer}>
          <p className={styles.descriptionTitle}>
            For each student,{" "}
            <span className={styles.descriptionTextBreack}>
              a{" "}
              <span className={styles.descriptionTextHighlight}>committed</span>{" "}
              tutor.
            </span>
          </p>
          <p className={styles.descriptionSubtitle}>
            For each question.{" "}
            <span className={styles.descriptionTextBreack}>
              The right answer.
            </span>
          </p>
          <div className={styles.descriptionLine}></div>
        </section>
        <Player
          autoplay
          loop
          src="https://assets6.lottiefiles.com/packages/lf20_tykkhlvn.json"
          className={styles.descriptionIllustration}
        ></Player>
      </section>
      <section className={styles.descriptionSecondaryContainer}>
        <div className={styles.descriptionSecondaryTextContainer}>
          <p className={styles.descriptionTitle}>
            Ask{" "}
            <span className={styles.descriptionTextHighlight}>anything</span>,{" "}
            <span className={styles.descriptionTextBreack}>
              we have got you covered
            </span>
          </p>
          <p className={styles.descriptionSubtitle}>
            Search for any subject you can imagine, a specialized tutor will
            help you with your problem
          </p>
        </div>
        <Player
          autoplay
          loop
          src="https://assets2.lottiefiles.com/packages/lf20_dikusanq.json"
          className={styles.descriptionIllustration}
        ></Player>
      </section>
    </>
  );
}

export { LandingPageDescription };
