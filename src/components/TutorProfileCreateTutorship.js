import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useSelector } from "react-redux";
import styles from "../assets/styles/pages/TutorEditProfile.module.scss";
import Swal from "sweetalert2";
import { useRouter } from 'next/router';
// import styless from "../assets/styles/pages/Tutorship.module.scss";

function TutorProfileCreateTutorship() {
  const router = useRouter();
  const email = router.query.email;
  const date = router.query.date;
  const time = router.query.time;
  const tutor_id = useSelector((state) => state.user.currentUser._id);
  const [tutorshipData, setTutorshipData] = useState({
    email: email || "",
    date: date || "",
    time: time || "",
    tutor_id: "",
  });
  const [errors, setErrors] = useState({
    errors: {
      email: "",
      date: "",
      time: "",
    },
    isValid: { email: false, date: false, time: false },
    enableUpload: false,
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

  useEffect(() => {
    setTutorshipData((state) => ({
      ...state,
      tutor_id: tutor_id,
    }));
  }, [tutor_id]);

  function handleChange(e) {
    setTutorshipData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  function validateInput(e) {
    const input = e.target.name;
    const value = e.target.value;
    if (input === "email") {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(value).toLowerCase())) {
        setErrors((state) => ({
          ...state,
          errors: {
            ...state.errors,
            email: "Invalid email, please enter a valid email",
          },
          isValid: { ...state.isValid, email: false },
          enableUpload: false,
        }));
      } else {
        setErrors((state) => ({
          ...state,
          errors: {
            ...state.errors,
            email: "",
          },
          isValid: { ...state.isValid, email: true },
          enableUpload: state.isValid.date && state.isValid.time,
        }));
      }
    }
    if (input === "date") {
      if (value.length === 0) {
        setErrors((state) => ({
          ...state,
          errors: {
            ...state.errors,
            date: "Please set the date for the tutorship",
          },
          isValid: { ...state.isValid, date: false },
          enableUpload: false,
        }));
      } else {
        setErrors((state) => ({
          ...state,
          errors: {
            ...state.errors,
            date: "",
          },
          isValid: { ...state.isValid, date: true },
          enableUpload: state.isValid.email && state.isValid.time,
        }));
      }
    }
    if (input === "time") {
      if (value.length === 0) {
        setErrors((state) => ({
          ...state,
          errors: {
            ...state.errors,
            time: "Please set the time for the tutorship",
          },
          isValid: { ...state.isValid, time: false },
          enableUpload: false,
        }));
      } else {
        setErrors((state) => ({
          ...state,
          errors: {
            ...state.errors,
            time: "",
          },
          isValid: { ...state.isValid, time: true },
          enableUpload: state.isValid.email && state.isValid.date,
        }));
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("/tutorship", tutorshipData);
      swalStyled.fire({
        icon: "success",
        title: "Tutorship created",
      });
    } catch (err) {
      const errorMessage = err.response.data.message;
      swalStyled.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    }
    setTutorshipData((state) => ({
      ...state,
      name: "",
      email: "",
      date: "",
      time: "",
    }));
    setErrors({
      errors: {
        email: "",
        date: "",
        time: "",
      },
      isValid: { email: false, date: false, time: false },
      enableUpload: false,
    });
  }

  return (
    <form action="" className={styles.tutorship__form} onSubmit={handleSubmit}>
      <div className={styles.tutorship__formSlot}>
        <label>Student Email</label>
        <input
          onBlur={validateInput}
          type="email"
          name="email"
          value={tutorshipData.email}
          placeholder="Student email"
          onChange={handleChange}
        />
        <span className={styles.tutorship__errors}>{errors.errors.email}</span>
      </div>
      <div className={styles.tutorship__formSlot}>
        <label>Date and time for the tutorship</label>
        <input
          type="date"
          onChange={handleChange}
          onBlur={validateInput}
          name="date"
          value={tutorshipData.date}
        />
        <span className={styles.tutorship__errors}>{errors.errors.date}</span>
        <input
          type="time"
          onChange={handleChange}
          onBlur={validateInput}
          name="time"
          value={tutorshipData.time}
        />
        <span className={styles.tutorship__errors}>{errors.errors.time}</span>
      </div>
      <div className={styles.tutorship__buttonContainer}>
        <input
          type="submit"
          value="Save Tutorship"
          className={styles.tutorship__buttonSubmit}
          disabled={
            email &&
            date &&
            time &&
            !errors.errors.email &&
            !errors.errors.date &&
            !errors.errors.time
              ? false
              : !errors.enableUpload
          }
        />
      </div>
    </form>
  );
}

export default TutorProfileCreateTutorship;
