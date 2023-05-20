import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "../assets/styles/components/CreditCard.module.scss";
import { useSelector } from "react-redux";
import axios from "../utils/axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function CreditCard({ tutorshipId, tutorshipDetails }) {
  const stripe = useStripe();
  const elements = useElements();
  const globalState = useSelector((state) => state);
  const router = useRouter();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
      MySwal.fire("Oops...", error.message, "error");
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);

      let paymentInfo = {
        amount: tutorshipDetails.price * 100,
        tutorship_id: tutorshipId,
        cardInfo: paymentMethod.id,
        customerInfo: {
          address: "1234 Main St",
          city: "Anytown",
        },
        user_id: globalState.user.currentUser._id,
        currentPaymentData: {},
        paymentMethod: paymentMethod,
      };

      try {
        let response = await axios.post("/payment", paymentInfo);
        console.log(response.data);

        MySwal.fire({
          title: "Payment Successful!",
          text: "Redirecting to home page...",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          router.push("/homePage");
        });
      } catch (err) {
        console.log(err);
        MySwal.fire(
          "Oops...",
          "Something went wrong while processing your payment. Please try again later.",
          "error"
        );
      }
    }
  };

  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "#5b5b5b",
        fontWeight: "500",
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        border: "1px solid #5b5b5b",
        ":-webkit-autofill": {
          color: "#fce883",
        },
        "::placeholder": {
          color: "#87bbfd",
        },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee",
      },
    },
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.creditCardBody}>
      <CardElement options={CARD_OPTIONS} />
      <button className={styles.creditCardButton}>Pay</button>
    </form>
  );
}

export default CreditCard;
