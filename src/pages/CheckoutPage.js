import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import history from "../utils/history";
import Swal from "sweetalert2";
import "../assets/styles/pages/checkout.scss";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutPage(props) {
  const elements = useElements();
  const stripe = useStripe();
  const tutorshipData = props.location.state.state;
  const { tutorship_id, tutorship_price } = tutorshipData;
  const [showCardForm, setShowCardForm] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const user_id = useSelector((state) => state.currentUser._id);
  const user_email = useSelector((state) => state.currentUser.email);
  const user_name = useSelector((state) => state.currentUser.name);
  const firstName = function (user_name) {
    if (!user_name) return "";
    const fullName = user_name.split(" ");
    if (fullName.length) {
      const result = fullName.slice(0, 2).join(" ");
      return result;
    } else {
      return fullName[0];
    }
  };

  const lastName = function (user_name) {
    if (!user_name) return "";
    const fullName = user_name.split(" ");
    if (fullName.length) {
      const result = fullName.slice(2, 4).join(" ");
      return result;
    } else {
      return fullName[1];
    }
  };

  const [cardName, setCardName] = useState({
    card_name: user_name,
  });
  const [count, setCount] = useState(1);
  const [hidden, setHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [cardInfo, setCardInfo] = useState({
    "card[number]": "",
    "card[exp_year]": "",
    "card[exp_month]": "",
    "card[cvc]": "",
  });
  const [customerInfo, setCustomerInfo] = useState({
    name: firstName(user_name),
    last_name: lastName(user_name),
    email: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    doc_type: "",
    doc_number: "",
    value: tutorship_price,
    tax: "16000",
    tax_base: "30000",
    currency: "COP",
    dues: "",
  });
  const [errors, setErrors] = useState({
    dues: "",
    doc_type: "",
    doc_number: "",
    "card[number]": "",
    "card[exp_year]": "",
    "card[exp_month]": "",
    "card[cvc]": "",
    name: "",
    last_name: "",
    email: "",
    card_name: "",
  });
  const [isValid, setIsValid] = useState({
    dues: false,
    doc_type: false,
    doc_number: false,
    "card[number]": false,
    "card[exp_year]": false,
    "card[exp_month]": false,
    "card[cvc]": false,
    name: true,
    last_name: true,
    email: true,
    card_name: true,
  });
  const swalStyled = Swal.mixin({
    customClass: {
      confirmButton: "swal__confirm",
      cancelButton: "swal__cancel",
      title: "swal__title",
      container: "swal__text",
      actions: "swal__actions",
    },
    buttonsStyling: false,
  });

  function previous() {
    setCount(count - 1);
    if (count === 1) {
      setCount(1);
    }
  }

  function next() {
    setCount(count + 1);
    if (count === 4) {
      setCount(4);
    }
  }

  useEffect(() => {
    axios
      .get(`/students/${user_id}`)
      .then((result) => {
        const student = result.data.students[0];
        setCustomerInfo((prevState) => ({
          ...prevState,
          email: student.email || user_email,
        }));
        if (student.status === "error") {
          setHidden(false);
        } else {
          setHidden(true);
          setIsValid((prevState) => ({
            ...prevState,
            "card[number]": true,
            "card[exp_year]": true,
            "card[exp_month]": true,
            "card[cvc]": true,
          }));
        }
      })
      .then(() => {
        setIsLoading(false);
      });
  }, [user_id, user_email]);

  function validateinputs(e) {
    const input = e.target.name;
    const value = e.target.value;
    const textRegex = /^[a-zA-Z\s]*$/;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (
      !value &&
      (input === "card[exp_month]" ||
        input === "card[exp_year]" ||
        input === "card[cvc]" ||
        input === "doc_type" ||
        input === "doc_number")
    ) {
      setErrors((state) => ({
        ...state,
        [input]: "this fields are mandatory, please fill each one of them",
      }));
      setIsValid((state) => ({
        ...state,
        [input]: false,
      }));
    } else if (!value) {
      setErrors((state) => ({
        ...state,
        [input]: "this field is mandatory",
      }));
      setIsValid((state) => ({
        ...state,
        [input]: false,
      }));
    } else if (
      (input === "card_name" || input === "name" || input === "last_name") &&
      !textRegex.test(String(e.target.value).toLowerCase())
    ) {
      setErrors((state) => ({
        ...state,
        [input]: "field must only contain letters",
      }));
      setIsValid((state) => ({
        ...state,
        [input]: false,
      }));
    } else if (
      input === "email" &&
      !emailRegex.test(String(value).toLowerCase())
    ) {
      setErrors((state) => ({
        ...state,
        [input]: "please enter a valid email",
      }));
      setIsValid((state) => ({
        ...state,
        [input]: false,
      }));
    } else {
      setErrors((state) => ({
        ...state,
        [input]: "",
      }));
      setIsValid((state) => ({
        ...state,
        [input]: true,
      }));
    }
  }

 

  function customerInfoChange(e) {
    setCustomerInfo((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  function cardInfoChange(e) {
    setCardInfo((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  function paymentInfoChange(e) {
    setPaymentInfo((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  function cardNameChange(e) {
    setCardName((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoadingPayment(true);
    setShowCardForm(true);

    if (!stripe || !elements) {
      // Stripe has not loaded yet. Make sure to disable
      // form submission until Stripe has loaded.
      return;
    }
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: `${customerInfo.name} ${customerInfo.last_name}`,
        email: customerInfo.email,
      },
    });

    if (error) {
      setLoadingPayment(false);
      swalStyled.fire({
        icon: "error",
        title: "Oops... Please try again",
        text: error.message,
      });
      return;
    }

    const response = await axios.post("/payment", {
      tutorship_id,
      user_id,
      paymentMethodId: paymentMethod.id,
      amount: paymentInfo.value,
    });

    if (response.data.success) {
      swalStyled.fire({
        icon: "success",
        title: "Succesfull payment",
      });
      history.push("/profile/tutorships");
    } else {
      throw new Error(response.data.message);
    }
  }

  return (
    <div className="payment__body">
    <div className="payment__page-body">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {count === 1 && (
            <form action="" className="payment__form">
              <div className="payment__form-slot">
                <label>name</label>
                <input
                  type="text"
                  name="name"
                  value={customerInfo.name}
                  onChange={customerInfoChange}
                  onBlur={validateinputs}
                />
                <span className="payment__errors">{errors.name}</span>
              </div>
              <div className="payment__form-slot">
                <label>last_name</label>
                <input
                  type="text"
                  name="last_name"
                  value={customerInfo.last_name}
                  onChange={customerInfoChange}
                  onBlur={validateinputs}
                />
                <span className="payment__errors">{errors.last_name}</span>
              </div>

              <div className="payment__card-form">
                <div className="payment__id-type-form-slot">
                  <label>id type</label>
                  <select
                    name="doc_type"
                    id="doc_type"
                    onChange={paymentInfoChange}
                    value={paymentInfo.doc_type}
                    onBlur={validateinputs}
                  >
                    <option value={0} hidden>
                      please select
                    </option>
                    <option value="cc">CC</option>
                    <option value="nit">NIT</option>
                  </select>
                </div>
                <div className="payment__id-num-form-slot">
                  <label>id number</label>
                  <input
                    name="doc_number"
                    type="number"
                    value={paymentInfo.doc_number}
                    onChange={paymentInfoChange}
                    onBlur={validateinputs}
                  />
                </div>
              </div>
              <span className="payment__errors">
                {errors.doc_type || errors.doc_number}
              </span>

              <div className="payment__form-slot">
                <label>email</label>
                <input
                  type="text"
                  name="email"
                  value={customerInfo.email}
                  onChange={customerInfoChange}
                  onBlur={validateinputs}
                />
                <span className="payment__errors">{errors.email}</span>
              </div>
            </form>
          )}

          {count === 2 && (
            <form action="" className="payment__form" onSubmit={handleSubmit}>
              <div className="payment__form-slot">
                <label>name on card</label>
                <input
                  type="text"
                  name="card_name"
                  value={cardName.card_name}
                  onChange={cardNameChange}
                  onBlur={validateinputs}
                />
                <span className="payment__errors">{errors.card_name}</span>
              </div>
              <div className="payment__form-slot">
                <label>card details</label>
                <CardElement style={{ border: '1px solid red' }} options={{ hidePostalCode: true }} />
              </div>
              <button
                className="payment__pay-button"
                disabled={
                  !(
                    isValid.dues &&
                    isValid.doc_type &&
                    isValid.doc_number &&
                    isValid.name &&
                    isValid.last_name &&
                    isValid.email &&
                    isValid.card_name
                  )
                }
              >
                pay
              </button>
            </form>
          )}
        </>
      )}

        {loadingPayment && (
          <div>
            <h1 className="payment__loader-title">
              Processing payment, please wait
            </h1>
            <Loader />
          </div>
        )}
        <div className="payment__button-container">
          <button
            onClick={previous}
            disabled={count === 1}
            hidden={isLoading || loadingPayment}
            className={
              count === 1
                ? "payment__previous-button-disabled"
                : "payment__page-button"
            }
          >
            previous
          </button>
          <button
            onClick={next}
            disabled={count === 2}
            hidden={isLoading || loadingPayment}
            className={
              count === 2
                ? "payment__next-button-disabled"
                : "payment__page-button"
            }
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
}
