import "../assets/styles/pages/checkout.scss";
import "../assets/styles/pages/LoginPage.scss";
import "../assets/styles/pages/StudentProfile.scss";
import "../assets/styles/pages/TutorProfile.scss";
import "../assets/styles/pages/TutorsSchedule.scss";
import "../assets/styles/pages/errorPage.scss";
import "../assets/styles/pages/landing-page.scss";
import "../assets/styles/pages/register.scss";
import "../assets/styles/pages/TutorEditProfile.scss";
import "../assets/styles/pages/Tutorship.scss";
import "../assets/styles/pages/TutorViewProfile.scss";
import { useDispatch } from "react-redux";
import { wrapper } from "../store";  // Import wrapper from your Redux store file
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getUserData } from "../slices/userSlice";
import { useEffect } from "react";

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

  return <Component {...pageProps} />;
}

const WrappedApp = wrapper.withRedux(InnerApp);

function App({ Component, pageProps }) {
  return (
    <Elements stripe={stripePromise}>
      <WrappedApp Component={Component} pageProps={pageProps} />
    </Elements>
  );
}

export default App;
