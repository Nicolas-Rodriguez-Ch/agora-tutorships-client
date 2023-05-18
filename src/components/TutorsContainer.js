import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import { CategoriesBar } from "./CategoriesBar";
import styles from "../assets/styles/components/TutorsContainer.module.scss";
import { CardContainer } from "./CardContainer";
import Loader from "./Loader";

function TutorsContainer({ title }) {
  const [filter, setFilter] = useState("Math");
  const [categories, setCategories] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const responseCat = await axios.get("/categories");
        const categoriesData = responseCat.data.categories;
        setCategories(categoriesData);
        const responseTut = await axios.get(`/tutors/${filter}`);
        const tutorsData = responseTut.data.tutors;
        setTutors(tutorsData);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }
    getData();
  }, [filter]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={`${styles.tutorsContainer} ${styles.tutorsReset}`}>
          <div
            className={`${styles.tutorsTitleContainer} ${styles.tutorsReset}`}
          >
            <p>{title}</p>
          </div>
          <div
            className={`${styles.categoriesContainer} ${styles.tutorsReset}`}
          >
            <CategoriesBar Categories={categories} setFilter={setFilter} />
          </div>
          <CardContainer Tutors={tutors} />
        </section>
      )}
    </>
  );
}

export { TutorsContainer };
