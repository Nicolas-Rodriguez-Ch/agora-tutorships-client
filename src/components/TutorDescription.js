import React from 'react';
import styles from '../assets/styles/pages/TutorViewProfile.module.scss';

function TutorDescription({ tutor }) {
  return (
    <div className={styles.tutorProfileDescriptionContainer}>
      <h1 className={styles.tutorProfileTitle}>About me</h1>
      <p className={styles.tutorProfileText}>{tutor.description}</p>
    </div>
  );
}

export { TutorDescription };
