import { React } from "react";
import styles from "../assets/styles/components/CardCointainer.module.scss";
import TutorsCard from "./tutorsCard";

function CardContainer({ Tutors }) {
  return (
    <main className={styles.cardContainer}>
      {Tutors.map((tutor, i) => {
        return <TutorsCard props={tutor} key={i} />;
      })}
    </main>
  );
}
export { CardContainer };
