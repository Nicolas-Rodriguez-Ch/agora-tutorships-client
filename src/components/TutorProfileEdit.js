import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "../assets/styles/pages/TutorEditProfile.module.scss";
import Image from "next/image";

function TutorProfilePage() {
  const globalUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.user.token);
  const [previewPhoto, setPreviewPhoto] = useState("");
  const [image, setImage] = useState("");
  const [isDisabled, setIsDisabled] = useState({
    name: true,
    password: true,
    schedule: true,
    description: true,
    price: true,
  });
  const [previewData, setPreviewData] = useState({
    name: "",
    email: "",
    description: "",
    schedule: "",
    price: "",
    rating: "",
  });
  const [userData, setUserData] = useState({
    inputs: {
      name: "",
      password: "",
      description: "",
      schedule: "",
      price: "",
    },
    errors: {
      name: "",
      password: "",
      schedule: "",
      price: "",
    },
    isValid: {
      name: true,
      password: true,
      schedule: true,
      price: true,
      description: true,
    },
    enableUpload: false,
  });
  const swalstylesd = Swal.mixin({
    customClass: {
      confirmButton: "swal__confirm",
      cancelButton: "swal__cancel",
      title: "swal__title",
      container: "swal__text",
      actions: "swal__actions",
    },
    buttonsStyling: false,
  });
  const starNodes = [];
  for (let i = 1; i <= previewData.rating; i++) {
    starNodes.push(
      <FontAwesomeIcon icon={faStar} key={i} title="tutor-rating-star" />
    );
  }

  useEffect(() => {
    axios
      .get(`/tutor/${globalUser.currentUser._id}`)
      .then((result) => {
        setPreviewData((state) => ({
          ...state,
          rating: result.data.rating || `You don't have any ratings yet`,
          name: globalUser.currentUser.name,
          email: globalUser.currentUser.email,
          description: globalUser.currentUser.description,
          schedule: globalUser.currentUser.schedule,
          price: result.data.price || `You don't have any ratings yet`,
        }));
        setPreviewPhoto(globalUser.profile_photo);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [globalUser]);

  function handleChange(e) {
    setUserData((state) => ({
      ...state,
      inputs: {
        ...state.inputs,
        [e.target.name]: e.target.value,
      },
    }));
  }

  function validateInput(e) {
    const input = e.target.name;
    const value = e.target.value;
    if (input === "name") {
      const re = /^[a-zA-Z\s]*$/;
      if (value.length < 4) {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            name: "Name is too short",
          },
          isValid: { ...state.isValid, name: false },
          enableUpload: false,
        }));
      } else if (!re.test(String(e.target.value).toLowerCase())) {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            name: "Name must only contain letters",
          },
          isValid: { ...state.isValid, name: false },
          enableUpload: false,
        }));
      } else {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            name: "",
          },
          isValid: { ...state.isValid, name: true },
          enableUpload:
            state.isValid.password &&
            state.isValid.schedule &&
            state.isValid.price,
        }));
      }
    }
    if (input === "email") {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(value).toLowerCase())) {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            email: "Invalid email, please enter a valid email",
          },
          isValid: { ...state.isValid, email: false },
          enableUpload: false,
        }));
      } else {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            email: "",
          },
          isValid: { ...state.isValid, email: true },
          enableUpload:
            state.isValid.name &&
            state.isValid.password &&
            state.isValid.schedule &&
            state.isValid.price,
        }));
      }
    }
    if (input === "password") {
      if (value.length < 4 || value.length === null) {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            password: "Password is too short",
          },
          isValid: { ...state.isValid, password: false },
          enableUpload: false,
        }));
      } else {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            password: "",
          },
          isValid: { ...state.isValid, password: true },
          enableUpload:
            state.isValid.name &&
            state.isValid.email &&
            state.isValid.schedule &&
            state.isValid.price,
        }));
      }
    }
    if (input === "schedule") {
      if (!value.includes("from") && !value.includes("to")) {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            schedule:
              "Invalid format, please type from (day) to (day), from (hour) to (hour)",
          },
          isValid: { ...state.isValid, schedule: false },
          enableUpload: false,
        }));
      } else {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            schedule: "",
          },
          isValid: { ...state.isValid, schedule: true },
          enableUpload:
            state.isValid.name &&
            state.isValid.password &&
            state.isValid.email &&
            state.isValid.price,
        }));
      }
    }
    if (input === "price") {
      if (value.length === 0) {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            price: "this field is mandatory",
          },
          isValid: { ...state.isValid, price: false },
          enableUpload: false,
        }));
      } else {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            price: "",
          },
          isValid: { ...state.isValid, price: true },
          enableUpload:
            state.isValid.name &&
            state.isValid.password &&
            state.isValid.email &&
            state.isValid.schedule,
        }));
      }
    }
    if (input === "description") {
      setUserData((state) => ({
        ...state,
        enableUpload: true,
      }));
    }
  }

  const handleClick = () => {
    setIsDisabled((prevState) => ({
      ...prevState,
      name: !prevState.name,
      password: !prevState.password,
      schedule: !prevState.schedule,
      description: !prevState.description,
      price: !prevState.price,
    }));
  };

  function onChangeFile(e) {
    if (!e.target.files.length) {
      return;
    }
    setImage(e.target.files[0]);
    setPreviewPhoto(URL.createObjectURL(e.target.files[0]));
    setUserData((state) => ({
      ...state,
      enableUpload: true,
    }));
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }

    updateTutorProfile(userData.inputs, formData, token);
  };

  const updateTutorProfile = async (inputs, formData, token) => {
    try {
      const response = await axios.patch("/update", {
        formData,
        inputs,
        url,
        token,
        type: "tutor",
      });
      formData.append("token", token);
      formData.append("type", "tutor");
      const { data: url } = await axios.patch("/uploadProfileImage", formData);
      localStorage.setItem("token", response.data);
      swalstylesd
        .fire({
          icon: "success",
          title: "Your data was updated successfully",
        })
        .then(() => {
          fetchTutorData();
        });
    } catch (error) {
      setUserData((state) => ({
        ...state,
        errors: {
          ...state.errors,
          email: "Email is taken, please use a different email",
        },
      }));
    }
  };

  const fetchTutorData = () => {
    axios
      .get(`/tutor/${globalUser.currentUser._id}`)
      .then((result) => {
        setPreviewData((state) => ({
          ...state,
          rating: result.data.rating || `You don't have any ratings yet`,
          name: globalUser.currentUser.name,
          email: globalUser.currentUser.email,
          description: globalUser.currentUser.description,
          schedule: globalUser.currentUser.schedule,
          price: result.data.price || `You don't have any ratings yet`,
        }));
        setPreviewPhoto(globalUser.profile_photo);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className={styles.tutorEditPhotoContainer}>
        <Image
          src={previewPhoto}
          className={styles.tutorEditPhoto}
          width={100}
          height={100}
          alt="user"
        />
        <label htmlFor="upload" className={styles.tutorEditButtonPhoto}>
          upload photo
        </label>
        <input
          type="file"
          id="upload"
          onChange={onChangeFile}
          hidden
          accept="image/png, image/jpeg"
        />
        <div className={styles.tutorEditRating}>
          <label>My Rating</label>
          {starNodes.length !== 0 ? (
            <div className={styles.tutorEditStars}>{starNodes}</div>
          ) : (
            <p>{previewData.rating}</p>
          )}
        </div>
      </div>
      <form action="" className={styles.tutorEditForm} onSubmit={onSubmit}>
        <div className={styles.tutorEditFormSlot}>
          <label>Name</label>
          <div className={styles.tutorEditFormSlotContainer}>
            <input
              onBlur={validateInput}
              defaultValue={previewData.name}
              type="text"
              name="name"
              onChange={handleChange}
              disabled={isDisabled.name}
            />

            <button
              onClick={handleClick}
              className={styles.tutorProfileCredentialsEmailInputButton}
              type="button"
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
          </div>
          <span className={styles.tutorEditErrors}>{userData.errors.name}</span>
        </div>
        <div className={styles.tutorEditFormSlot}>
          <label>Password</label>
          <div className={styles.tutorEditFormSlotContainer}>
            <input
              onBlur={validateInput}
              defaultValue="12345"
              type="password"
              name="password"
              onChange={handleChange}
              disabled={isDisabled.password}
            />
            <button
              onClick={handleClick}
              className={styles.tutorProfileCredentialsPasswordInputButton}
              type="button"
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
          </div>
          <span className={styles.tutorEditErrors}>
            {userData.errors.password}
          </span>
        </div>
        <div className={styles.tutorEditFormSlot}>
          <label>Tutorship Fee</label>
          <div className={styles.tutorEditFormSlotContainer}>
            <input
              defaultValue={previewData.price}
              onBlur={validateInput}
              type="number"
              name="price"
              onChange={handleChange}
              disabled={isDisabled.price}
            />
            <button
              onClick={handleClick}
              className={styles.tutorProfileCredentialsPriceInputButton}
              type="button"
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
          </div>
          <span className={styles.tutorEditErrors}>
            {userData.errors.price}
          </span>
        </div>
        <div className={styles.tutorEditFormSlot}>
          <label>Schedule</label>
          <div className={styles.tutorEditFormSlotContainer}>
            <input
              onBlur={validateInput}
              defaultValue={previewData.schedule}
              placeholder="please type your schedule, example from mondays to fridays, from 8:30am to 5:00pm"
              type="text"
              name="schedule"
              onChange={handleChange}
              disabled={isDisabled.schedule}
            />
            <button
              onClick={handleClick}
              className={styles.tutorProfileCredentialsScheduleInputButton}
              type="button"
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
          </div>
          <span className={styles.tutorEditErrors}>
            {userData.errors.schedule}
          </span>
        </div>
        <div className={styles.tutorEditFormSlot}>
          <label>Description</label>
          <div className={styles.tutorEditFormSlotContainer}>
            <textarea
              id="form"
              name="description"
              onChange={handleChange}
              onBlur={validateInput}
              defaultValue={previewData.description}
              placeholder="Let our students know something about you"
              cols="30"
              rows="10"
              className={styles.tutorEditFormDescription}
              disabled={isDisabled.description}
            ></textarea>
            <button
              onClick={handleClick}
              className={styles.tutorProfileCredentialsDescriptionInputButton}
              type="button"
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
          </div>
        </div>
        <div className={styles.tutorEditButtonContainer}>
          <input
            type="submit"
            value="save changes"
            className={styles.tutorEditButtonSubmit}
            disabled={!userData.enableUpload}
          />
        </div>
      </form>
    </>
  );
}

export default TutorProfilePage;
