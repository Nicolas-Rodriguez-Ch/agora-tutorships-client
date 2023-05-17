import "../assets/styles/pages/checkout.scss";
import "../assets/styles/pages/TutorsSchedule.scss";
import "../assets/styles/pages/register.scss";
import "../assets/styles/pages/TutorViewProfile.scss";
import { useDispatch, Provider } from "react-redux";
import { wrapper } from "../store";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getUserData } from "../slices/userSlice";
import { useEffect } from "react";
import Header from "../components/Header";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function InnerApp({ Component, pageProps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect is running");
    const token = localStorage.getItem("token");
    console.log("Token: ", token);
    if (token) {
      dispatch(getUserData(token));
    }
  }, [dispatch]);

  return (
    <Elements stripe={stripePromise}>
      <Header />
      <Component {...pageProps} />
    </Elements>
  );
}

function MyApp({ Component, pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <InnerApp Component={Component} {...props} />
    </Provider>
  );
}

export default MyApp;
