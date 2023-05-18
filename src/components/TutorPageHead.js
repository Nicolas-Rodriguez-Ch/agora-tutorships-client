import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import styles from "../assets/styles/pages/TutorProfile.module.scss";

function TutorPageHead({ tutor, tutorId }) {
  const starNodes = [];
  const [price, setPrice] = useState(" ");
  const [priceDefined, setPriceDefined] = useState(true);

  useEffect(() => {
    if (tutor.price) {
      
      setPrice(tutor.price.toLocaleString());
    } else {
      setPrice(`Tutorship fee has not been defined`);
      setPriceDefined(false);
    }
  }, [tutor.price]);

  for (let i = 1; i <= tutor.rating; i++) {
    starNodes.push(
      <FontAwesomeIcon icon={faStar} key={i} title="tutor-rating-star" />
    );
  }

  return (
    <main className={styles.tutorProfileProfileContainer}>
      <Image
        src={tutor.profile_photo}
        alt="tutor profile"
        className={styles.tutorProfilePhoto}
        width={100}
        height={75}
      />
      <div className={styles.tutorProfileProfileContainerText}>
        <h1 className={styles.tutorProfileTitle}>{tutor.name}</h1>
        <h2 className={styles.tutorProfileSubtitle}>{tutor.profession}</h2>
        <h2 className={styles.tutorProfileSubtitle}>Area: {tutor.focus}</h2>
        <p className={styles.tutorProfileSubtitle}>
          {priceDefined ? `Tutorship Fee: COP ${price}` : price}
        </p>
        <div className={styles.tutorProfileStars}>{starNodes}</div>
      </div>
      <div className={styles.tutorProfileScheduleContainer}>
        <h2 className={styles.tutorProfileSubtitle}>Availability</h2>
        <h3 className={styles.tutorProfileAvailability}>{tutor.schedule}</h3>
        <Link
          href={`/tutor/${tutorId}/schedule`}
          className={styles.tutorProfileScheduleButton}
        >
          Schedule Appointment
        </Link>
      </div>
    </main>
  );
}

export { TutorPageHead };
