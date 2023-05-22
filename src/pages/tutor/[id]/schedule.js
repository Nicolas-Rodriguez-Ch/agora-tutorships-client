import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import axios from "../../../utils/axios";
import Swal from "sweetalert2";
import Image from "next/image";
import styles from "../../../assets/styles/pages/TutorsSchedule.module.scss";
import { useRouter } from "next/router";

function TutorsSchedule(props) {
  const router = useRouter();
  const { id } = router.query;
  const student = useSelector((state) => state.user.currentUser);
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
  const createDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${
      (date.getMonth() + 1).toString().length < 2
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1
    }-${
      date.getDate().toString().length < 2
        ? `0${date.getDate()}`
        : date.getDate()
    }`;
  };

  const [state, setState] = useState({
    tutor: {},
    loading: true,
    inputs: {
      subject: null,
      description: null,
      date: createDate(),
      time: null,
    },
    error: false,
  });

  useEffect(() => {
    async function getTutorData() {
      axios
        .get(`/tutor/${id}`)
        .then((query) => {
          setState((prevState) => ({
            ...prevState,
            loading: false,
            tutor: query.data,
          }));
        })
        .catch(() => {
          router.replace("/homePage");
        });
    }

    if (id) {
      getTutorData();
    }
  }, [id, router]);

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      inputs: { ...prevState.inputs, [e.target.id]: e.target.value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, error: false }));
    const { subject, description, date, time } = state.inputs;
    if (subject && description && date && time) {
      const apponintment = {
        tutor: state.tutor,
        inputs: state.inputs,
        student: student,
      };

      axios
        .post("/tutorship", apponintment)
        .then((req, res) => {
          swalStyled
            .fire({
              icon: "success",
              title: "Tutorship request sent successfully!",
              text: `${state.tutor.name} will get in contact soon`,
            })
            .then(() => {
              router.replace("/homePage");
            });
        })
        .catch((error) => {
          swalStyled.fire({
            icon: "error",
            title: "Error sending your request",
            text: `${error}`,
          });
        });
    } else {
      setState((prevState) => ({ ...prevState, error: true }));
    }
  };

  return (
    <main className={styles.tutorsscheduleMain}>
      {state.loading ? (
        <Loader />
      ) : (
        <>
          <h1>
            Ask {state.tutor.name} for a {state.tutor.focus} tutorship
          </h1>
          <Image
            src={state.tutor.profile_photo}
            alt={state.tutor.name}
            width={100}
            height={75}
          />

          <form className={styles.tutorsscheduleForm}>
            <label htmlFor="subject">Subject*</label>
            <input
              onChange={handleChange}
              id="subject"
              type="text"
              placeholder=""
            />

            <label htmlFor="description">Description*</label>
            <textarea
              onChange={handleChange}
              id="description"
              rows="20"
              type="text"
              placeholder="Give me a brief summary about the matter"
            />

            <label htmlFor="date">What day would be good for you?*</label>
            <input
              onChange={handleChange}
              value={state.inputs.date}
              min={createDate()}
              id="date"
              type="date"
            />
            <label htmlFor="time">What time?*</label>
            <input
              onChange={handleChange}
              id="time"
              step="3600"
              defaultValue="00:00"
              min="06:00"
              max="23:00"
              type="time"
            />
            {state.error && <span>Please fill all the fields</span>}
            <button onClick={handleSubmit} type="submit">
              Submit
            </button>
          </form>
        </>
      )}
    </main>
  );
}

export default TutorsSchedule;
