import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TutorPageHead } from '../../components/TutorPageHead';
import { TutorDescription } from '../../components/TutorDescription';
import { ReviewsContainer } from '../../components/ReviewsContainer';
import styles from '../../assets/styles/pages/TutorViewProfile.module.scss';
import axios from '../../utils/axios';
import Loader from '../../components/Loader';

function TutorDetailsPage() {
  const [tutor, setTutor] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function tutorDetailsData(id) {
      try {
        const tutorData = await axios.get(`/tutor/${id}`);
        const data = tutorData.data;
        const reviewData = tutorData.data.reviews;
        setTutor(data);
        setReviews(reviewData);
        setLoading(false);
      } catch (err) {
        router.replace('/homePage');
      }
    }
    if (id) {
      tutorDetailsData(id);
    }
  }, [id, router]);

  return (
    <>
      <div className={styles.tutorProfileBody}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <TutorPageHead tutor={tutor} tutorId={id} />
            <TutorDescription tutor={tutor} />
            <ReviewsContainer reviews={reviews} />
          </>
        )}
      </div>
    </>
  );
}

export default TutorDetailsPage;
