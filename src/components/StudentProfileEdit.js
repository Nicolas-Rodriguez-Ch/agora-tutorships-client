import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "../utils/axios";
import Swal from "sweetalert2";
import Image from "next/image";
import style from "../assets/styles/pages/StudentProfile.module.scss";

const StudentProfileEdit = () => {
  const state = useSelector((state) => state.user.currentUser);

  const token = useSelector((state) => state.user.token);
  
  const [isDisabled, setIsDisabled] = useState({
    name: true,
    email: true,
    password: true,
    submit: true,
  });
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
    visible: false,
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (inputs.name !== "" || inputs.email !== "" || inputs.password !== "") {
      setIsDisabled((prevState) => ({ ...prevState, submit: false }));
    } else {
      setIsDisabled((prevState) => ({ ...prevState, submit: true }));
    }
  }, [inputs, state]);
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

  const handleClick = (inputName) => {
    setIsDisabled((prevState) => ({
      ...prevState,
      [inputName]: !prevState[inputName],
    }));
  };

  const validateInputs = (name, email, password) => {
    if (name && (name.length < 4 || name.match(/[0-9]/))) {
      setErrors((prevState) => ({
        ...prevState,
        name: "Invalid name, the name must be at least 4 characters in length and contain only letters",
      }));
      return false;
    } else {
      setErrors((prevState) => ({
        ...prevState,
        name: undefined,
      }));
    }
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email || re.test(String(email).toLowerCase())) {
      setErrors((prevState) => ({
        ...prevState,
        email: undefined,
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        email: "Invalid email, please enter a valid email and try again.",
      }));
      return false;
    }

    if (password && password.length < 4) {
      setErrors((prevState) => ({
        ...prevState,
        password: "Invalid password, the password is too short",
      }));
      return false;
    } else {
      setErrors((prevState) => ({
        ...prevState,
        password: undefined,
      }));
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    if (validateInputs(inputs.name, inputs.email, inputs.password)) {
      updateStudentProfile(inputs, formData, token);
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpload = async (e) => {
    setImage(e.target.files[0]);
    setIsDisabled((prevState) => ({ ...prevState, submit: false }));
  };

  const updateStudentProfile = async (inputs, formData, token) => {
    try {
      const updatedInputs = Object.fromEntries(
        Object.entries(inputs).filter(([key, value]) => value)
        );
        
        const response = await axios.patch("/update", {
          formData,
          inputs: updatedInputs,
          url,
          token,
          type: "student",
        });
        formData.append("token", token);
        formData.append("type", "student");
        const { data: url } = await axios.patch("/uploadProfileImage", formData);
  
      localStorage.setItem("token", response.data);
      swalStyled
        .fire({
          icon: "success",
          title: "Your data was updated successfully",
        });
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Email is taken, please use a different email",
      }));
    }
  };
  

  return (
    <>
      <section className={style.studentProfilePhotoContainer}>
        <Image
          className={style.studentProfilePhoto}
          src={image ? URL.createObjectURL(image) : state.rofile_photo}
          alt={state.name}
          width={100}
          height={75}
        />
        <label
          htmlFor="student-profile__photo__input"
          className={style.studentProfilePhotoButton}
        >
          Upload photo
        </label>
        <input
          onChange={handleUpload}
          id="student-profile__photo__input"
          className={style.studentProfilePhotoInput}
          type="file"
          accept="image/png, image/jpeg"
        />
      </section>
      <section className={style.studentProfileCredentials}>
        <div className={style.studentProfileCredentialsNameContainer}>
          <label
            className={style.studentProfileCredentialsNameLabel}
            htmlFor="student-profile__credentials__name-input"
          >
            Name
          </label>
          <div className={style.studentProfileCredentialsNameInputContainer}>
            <input
              onChange={handleChange}
              name="name"
              disabled={isDisabled.name}
              placeholder="name"
              id="student-profile__credentials__name-input"
              className={style.studentProfileCredentialsNameInput}
              defaultValue={state.name}
              type="name"
            />
            <button
              onClick={() => handleClick("name")}
              className={style.studentProfileCredentialsNameInputButton}
              type="button"
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
          </div>
          <span className={style.studentProfileErrorMessage}>
            {errors.name}
          </span>
        </div>

        <div className={style.studentProfileCredentialsEmailContainer}>
          <label
            className={style.studentProfileCredentialsEmailLabel}
            htmlFor="student-profile__credentials__email-input"
          >
            Email
          </label>
          <div className={style.studentProfileCredentialsEmailInputContainer}>
            <input
              onChange={handleChange}
              name="email"
              disabled={isDisabled.email}
              placeholder="Email"
              id="student-profile__credentials__email-input"
              className={style.studentProfileCredentialsEmailInput}
              defaultValue={state.email}
              type="email"
            />
            <button
              onClick={() => handleClick("email")}
              className={style.studentProfileCredentialsEmailInputButton}
              type="button"
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
          </div>
          <span className={style.studentProfileErrorMessage}>
            {errors.email}
          </span>
        </div>

        <div className={style.studentProfileCredentialsPasswordContainer}>
          <label
            className={style.studentProfileCredentialsPasswordLabel}
            htmlFor="student-profile__credentials__password-input"
          >
            Password
          </label>
          <div
            className={style.studentProfileCredentialsPasswordInputContainer}
          >
            <input
              onChange={handleChange}
              name="password"
              disabled={isDisabled.password}
              placeholder="Password"
              id="student-profile__credentials__password-input"
              className={style.studentProfileCredentialsPasswordInput}
              defaultValue="**********"
              type="password"
            />
            <button
              onClick={() => handleClick("password")}
              className={style.studentProfileCredentialsPasswordInputButton}
              type="button"
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
          </div>
          <span className={style.studentProfileErrorMessage}>
            {errors.password}
          </span>
        </div>
        <div className={style.studentProfileCredentialsSubmitButtonContainer}>
          <button
            disabled={isDisabled.submit}
            onClick={handleSubmit}
            className={`${style.studentProfileSubmitButton} ${
              isDisabled.submit && "disabled"
            }`}
            type="submit"
          >
            Submit changes
          </button>
        </div>
      </section>
    </>
  );
};

export default StudentProfileEdit;
