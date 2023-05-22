import React from "react";
import { Review } from "./Review";
import styles from "../assets/styles/pages/TutorViewProfile.module.scss";

function ReviewsContainer({ reviews }) {
  return (
    <div className={styles.tutorProfileReviewsContainer}>
      <h1 className={styles.tutorProfileTitle}>Student feedback</h1>
      <div>
        {reviews.map((props) => {
          return (
            <Review
              key={props._id}
              comment={props.comment}
              rating={props.rating}
              studentName={props.student_id.name}
            />
          );
        })}
      </div>
    </div>
  );
}

export { ReviewsContainer };
