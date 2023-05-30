import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { login } from "../../slices/userSlice";
import { useRouter } from "next/router";
import styles from "../../assets/styles/pages/LoginPage.module.scss";
import { useDispatch, useSelector } from "react-redux";

function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [state, setState] = useState({
    values: {
      email: "",
      password: "",
    },
    errors: {},
    isValid: false,
  });

  useEffect(() => {
    if (globalState.user.auth_status === "authorized") {
      router.push("/homePage");
    }
  }, [globalState.user.auth_status, router]);

  const validateInputs = (e) => {
    const inputName = e.target.name;
    if (inputName === "email") {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(e.target.value).toLowerCase())) {
        setState((prevState) => ({
          ...prevState,
          errors: { ...prevState.errors, email: undefined },
          isValid: prevState.errors.length === 0,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            email: { message: "Invalid email, please enter a valid email" },
          },
          isValid: false,
        }));
        return;
      }
      setState((prevState) => ({
        ...prevState,
        errors: { ...prevState.errors, password: undefined },
        isValid: !(state.errors.email && state.errors.password),
      }));
      return;
    }
    if (inputName === "password") {
      if (e.target.value.length < 4) {
        setState((prevState) => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            password: {
              message: "Invalid password, the password is too short",
            },
          },
          isValid: false,
        }));
        return;
      }
      setState((prevState) => ({
        ...prevState,
        errors: { ...prevState.errors, password: undefined },
        isValid: !(prevState.errors.email && prevState.errors.password),
      }));
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await validateCredentials(state.values);
  };

  const validateCredentials = ({ email, password }) => {
    dispatch(login({ email, password }));
  };

  const handleChange = (e, current) => {
    setState((prevState) => ({
      ...prevState,
      values: { ...prevState.values, [current]: e.target.value },
    }));
  };

  return (
    <div className={`${styles.loginFormContainer}`}>
      <form className={`${styles.loginForm}`}>
        <fieldset className={`${styles.loginLoginFieldset}`}>
          <h1 className={`${styles.loginFormLegend}`} data-testid="login-title">
            Sign In
          </h1>
          <div className={`${styles.loginInputContainer}`}>
            <div className={`${styles.inputContainerInput}`}>
              <span className={`${styles.loginInputIcon}`}>
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                onBlur={validateInputs}
                onChange={(e) => handleChange(e, "email")}
                className={`${styles.loginInputInput}`}
                type="email"
                name="email"
                id="login-email"
                placeholder="Email"
                data-testid="email"
                required
              />
            </div>
            <div className={`${styles.inputContainerErrorMessage}`}>
              <span
                styles={{
                  color: "red",
                  visibility: state.errors.email ? "visible" : "hidden",
                }}
                className={`${styles.emailErrorSpan}`}
              >
                {state.errors.email
                  ? state.errors.email.message
                  : "No hay errores"}
              </span>
            </div>
          </div>
          <div className={`${styles.loginInputContainer}`}>
            <div className={`${styles.inputContainerInput}`}>
              <span className={`${styles.loginInputIcon}`}>
                <FontAwesomeIcon icon={faKey} />
              </span>
              <input
                onBlur={validateInputs}
                onChange={(e) => handleChange(e, "password")}
                className={`${styles.loginInputInput}`}
                type="password"
                name="password"
                id="login-password"
                placeholder="Password"
                data-testid="password"
                required
              />
            </div>
            <div className={`${styles.inputContainerErrorMessage}`}>
              <span
                styles={{
                  color: "red",
                  visibility: state.errors.password ? "visible" : "hidden",
                }}
                className={`${styles.passwordErrorSpan}`}
              >
                {state.errors.password
                  ? state.errors.password.message
                  : "No hay errores"}
              </span>
              {globalState.login_failed && (
                <span style={{ color: "red" }}>
                  Incorrect email or password, please try again.
                </span>
              )}
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={!state.isValid}
            className={`${styles.loginFormSubmit} ${
              !state.isValid && styles.loginFormSubmitDisabled
            }`}
            type="submit"
            data-testid="login-send"
          >
            Sign In
          </button>
        </fieldset>
        <fieldset className={`${styles.loginSignupFieldset}`}>
          <p className={`${styles.signupText}`}>
            Do not have an account? <Link href="/register">Register</Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
}

export default LoginPage;
