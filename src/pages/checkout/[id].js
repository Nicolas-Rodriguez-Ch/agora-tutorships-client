import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import Loader from "../../components/Loader";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styles from "../../assets/styles/pages/checkout.module.scss";
import { useRouter } from "next/router";
import CreditCard from "../../components/CreditCard";

const stripePromise = loadStripe(
  "pk_test_51N2I3CBnCg0IxhERW2nX06gzu1OaOqbhAnwzv1kbqyStHhkun0M456wgmyJdA3Rk6TLXoHnoJX4NBxaAHw3QR84i00PVWSOoCt"
);

function CheckoutPage() {
  const [tutorshipDetails, setTutorshipDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id: tutorshipId } = router.query;

  useEffect(() => {
    const fetchTutorshipDetails = async () => {
      try {
        const response = await axios.get(`/tutorships/${tutorshipId}`);
        setTutorshipDetails(response.data[0]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    if (tutorshipId) {
      fetchTutorshipDetails();
    }
  }, [tutorshipId]);

  return (
    <div className={styles.paymentBody}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.paymentFormSlot}>
          <h2 className={styles.paymentFormSlotTitle}>Tutorship Details</h2>
          <div className={styles.paymentFormSlotContent}>
            <p className={styles.paymentFormSlotText}>
              Tutor: {tutorshipDetails.tutor_id.name}
            </p>
            <p className={styles.paymentFormSlotText}>
              Subject: {tutorshipDetails.tutor_id.focus}
            </p>
            <p className={styles.paymentFormSlotText}>
              Description: {tutorshipDetails.tutor_id.description}
            </p>
            <p className={`${styles.paymentFormSlotText} ${styles.price}`}>
              {tutorshipDetails.tutor_id.price
                ? `COP $ ${tutorshipDetails.tutor_id.price.toLocaleString()}`
                : "Price not assigned"}
            </p>
          </div>
          <Elements stripe={stripePromise}>
            <CreditCard
              tutorshipId={tutorshipId}
              tutorshipDetails={tutorshipDetails}
            />
          </Elements>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
