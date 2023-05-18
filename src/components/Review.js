import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "../assets/styles/pages/TutorViewProfile.module.scss";

function Review({ comment, rating, studentName }) {
  const starNodes = [];

  for (let i = 1; i <= rating; i++) {
    starNodes.push(
      <FontAwesomeIcon icon={faStar} key={i} title="review-rating-star" />
    );
  }

  return (
    <div className={styles.tutorProfileReviewContainer}>
      <p className={styles.tutorProfileReviewName}>{studentName}</p>
      <div className={styles.tutorProfileStars}>{starNodes}</div>
      <p className={styles.tutorProfileText}>{comment}</p>
    </div>
  );
}

export { Review };
