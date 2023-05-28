import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TutorPageHead } from '../../components/TutorPageHead';
import { TutorDescription } from '../../components/TutorDescription';
import { ReviewsContainer } from '../../components/ReviewsContainer';
import styles from '../../assets/styles/pages/TutorViewProfile.module.scss';
import axios from '../../utils/axios';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from "react-redux";
import { startChat } from "../../slices/chatSlice";
import { io } from "socket.io-client";

let socket;

function TutorDetailsPage() {
  const [tutor, setTutor] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.currentUser._id)
  
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

    socket = io(
      process.env.NEXT_PUBLIC_APP_BACKEND_URL || "http://localhost:3001"
    );

    return () => {
      socket.close();
      socket.removeAllListeners();
    };
  }, [id, router]);

  const handleStartChat = () => {
    if (id) {
      dispatch(startChat(id));
      socket.emit("join room", { roomId: id, userId });
    } else {
      console.error("No room ID available");
    }
  };
  
  
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
            <button className={styles.chatButton} onClick={handleStartChat}>Start Chat</button>
          </>
        )}
      </div>
    </>
  );
}

export default TutorDetailsPage;
