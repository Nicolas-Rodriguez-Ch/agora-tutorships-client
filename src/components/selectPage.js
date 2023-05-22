import React from "react";
import styles from "../assets/styles/components/SearchPageFirst.module.scss";

const SelectPage = ({ Page, setPage, Pages }) => {
  const prevPage = (e) => {
    e.preventDefault();
    setPage((Page) => (Page === 1 ? (Page = 1) : Page - 1));
    window.scrollTo(0, 0);
  };

  const nextPage = (e) => {
    e.preventDefault();
    setPage((Page) => (Page === Pages ? (Page = 11) : Page + 1));
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.changePageContainer}>
      <button
        className={
          Page > 1
            ? styles.changePageButton
            : `${styles.changePageButton}-hidden`
        }
        onClick={prevPage}
      >
        Prev
      </button>

      <p className={styles.changePageP}>
        Page {Page} / {Pages > 1 ? Pages : 1}
      </p>
      <button
        className={
          Page < Pages
            ? styles.changePageButton
            : `${styles.changePageButton}-hidden`
        }
        onClick={nextPage}
      >
        Next
      </button>
    </div>
  );
};

export default SelectPage;
