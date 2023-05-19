// import React from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import styles from "../assets/styles/components/CreditCard.module.scss";
// import { useSelector } from "react-redux";
// import axios from "../utils/axios";

// function CreditCard({ tutorshipId, tutorshipDetails }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const globalState = useSelector((state) => state);

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: cardElement,
//     });

//     if (error) {
//       console.log("[error]", error);
//     } else {
//       console.log("[PaymentMethod]", paymentMethod);

//       let paymentInfo = {
//         amount: tutorshipDetails.tutor_id.price * 100,
//         tutorship_id: tutorshipId,
//         cardInfo: paymentMethod.id,
//         customerInfo: {
//           address: "1234 Main St",
//           city: "Anytown",
//         },
//         user_id: globalState.user.currentUser._id,
//         currentPaymentData: {},
//       };

//       try {
//         let response = await axios.post("/payment", paymentInfo);
//         console.log(response.data);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };
//   const CARD_OPTIONS = {
//     iconStyle: "solid",
//     style: {
//       base: {
//         iconColor: "#c4f0ff",
//         color: "#5b5b5b",
//         fontWeight: "500",
//         fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
//         fontSize: "16px",
//         fontSmoothing: "antialiased",
//         border: "1px solid #5b5b5b",
//         ":-webkit-autofill": {
//           color: "#fce883",
//         },
//         "::placeholder": {
//           color: "#87bbfd",
//         },
//       },
//       invalid: {
//         iconColor: "#ffc7ee",
//         color: "#ffc7ee",
//       },
//     },
//   };

//   return (
//     <form onSubmit={handleFormSubmit} className={styles.creditCardBody}>
//       <CardElement options={CARD_OPTIONS} />
//       <button className={styles.creditCardButton}>Pay</button>
//     </form>
//   );
// }

// export default CreditCard;
