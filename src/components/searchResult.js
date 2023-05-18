import TutorsCard from "./tutorsCard";
import styles from "../assets/styles/components/SearchResult.module.scss";

const SearchResult = (Tutors) => {
  return (
    <main className={styles.search__result}>
      {Tutors.Tutors.map((element, i) => (
        <TutorsCard props={element} key={i} />
      ))}
    </main>
  );
};

export default SearchResult;
