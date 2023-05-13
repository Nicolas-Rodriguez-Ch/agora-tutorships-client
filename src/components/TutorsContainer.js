import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import { CategoriesBar } from "./CategoriesBar";
import styles from "../assets/styles/components/TutorsContainer.module.scss";
import { CardContainer } from "./CardContainer";
import Loader from "./Loader";

function TutorsContainer({ title }) {
  const [filter, setFilter] = useState("Math");
  const [Categories, setCategories] = useState([]);
  const [Tutors, setTutors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const responseCat = await axios.get("/categories");
        const categories = responseCat.data.categories;
        setCategories(categories);
        const responseTut = await axios.get(`/tutors/${filter}`);
        const tutors = responseTut.data.tutors;
        setTutors(tutors);
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
        <section
          className={`${styles.tutors__container} ${styles.tutorsReset}`}
        >
          <div
            className={`${styles.tutorsTitleContainer} ${
              styles.tutorsReset
            }`}
          >
            <p>{title}</p>
          </div>
          <div
            className={`${styles.categories__container} ${styles.tutorsReset}`}
          >
            <CategoriesBar Categories={Categories} setFilter={setFilter} />
          </div>
          <CardContainer Tutors={Tutors} />
        </section>
      )}
    </>
  );
}
export { TutorsContainer };
