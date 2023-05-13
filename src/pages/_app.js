import "../assets/styles/pages/checkout.scss";
import "../assets/styles/pages/HomePage.scss";
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
import { Provider } from "react-redux";
import store from "../store";
import { useRouter } from "next/router";


export default function app({ Component, pageProps }) {
  const router = useRouter();
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}
