import { Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import { LandingPage } from "./pages/LandingPage";
import TutorDetailsPage from "./pages/tutor/[id]";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import getUserData from "./actions/getUserData";
import { AUTH_FAILED } from "./actions/constants";
import { useEffect } from "react";
import { errorPage } from "./pages/errorPage";
import HomePage from "./pages/HomePage";
import history from "./utils/history";
import ProfileRouteComponent from "./utils/ProfileRouteComponent";
import { SearchPage } from "./pages/searchPage";
import ScrollToTop from "./utils/ScrollToTop";
import TutorsSchedule from "./pages/tutor/[id]/schedule";
import CheckoutPage from "./pages/CheckoutPage";
import StudentRoute from "./utils/StudentRoute";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function App() {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

  useEffect(() => {
    if (token !== null) {
      dispatch(getUserData(token));
    } else {
      dispatch({ type: AUTH_FAILED });
    }
  }, [dispatch, token]);

  return (
    <Router history={history}>
      <ScrollToTop />
      <Layout>
        <Switch>
          <Elements stripe={stripePromise}>
            <StudentRoute exact path="/home" component={HomePage} />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={LoginPage} />
            <StudentRoute path="/search" component={SearchPage} />
            <Route exact path="/error" component={errorPage} />
            <PrivateRoute
              exact
              path="/profile/:section"
              component={ProfileRouteComponent}
            />
            <StudentRoute
              exact
              path="/tutor/:id"
              component={TutorDetailsPage}
            />
            <StudentRoute
              exact
              path="/tutor/:id/schedule"
              component={TutorsSchedule}
            />
            <StudentRoute exact path="/checkout/:id" component={CheckoutPage} />
            <Route path="*" component={errorPage} />
          </Elements>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
