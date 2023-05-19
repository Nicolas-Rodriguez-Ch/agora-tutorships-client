import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import Loader from "../../components/Loader";
import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styles from "../../assets/styles/pages/checkout.module.scss";
import { useRouter } from "next/router";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function CheckoutForm() {
  const [tutorshipDetails, setTutorshipDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id: tutorshipId } = router.query;

  const stripe = useStripe();
  const elements = useElements();

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

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
          <form onSubmit={handleSubmit} className={styles.paymentForm}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "20px",
                  },
                },
              }}
            />{" "}
            <button
              type="submit"
              className={styles.paymentPayButton}
              disabled={!stripe}
            >
              Pay
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
