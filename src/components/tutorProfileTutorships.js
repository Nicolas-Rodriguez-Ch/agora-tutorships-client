import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../utils/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loader from "./Loader";
import TutorCancelTutorship from "./tutorCancelTutorship.js";
import TutorCompleteTutorship from "./TutorCompleteTutorship";
import Image from "next/image";
import styles from "../assets/styles/components/tutorProfileTutorships.module.scss";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

function TutorProfileTutorships() {
  const id = useSelector((state) => state.currentUser._id);
  const [state, setState] = useState({
    tutorships: [],
    loading: false,
    renderSwitch: false,
    getStudents: false,
  });

  const handleClick = async (data, e) => {
    const button = e.target.innerText;
    const mySwal = withReactContent(Swal);
    const buttons = {
      Cancel: {
        component: (
          <TutorCancelTutorship
            swal={mySwal}
            tutorshipId={data.tutorshipId}
            setState={setState}
          />
        ),
      },
      Complete: {
        component: (
          <TutorCompleteTutorship
            swal={mySwal}
            tutorshipId={data.tutorshipId}
            setState={setState}
          />
        ),
      },
    };

    const action = buttons[button];

    await mySwal.fire({
      html: action.component,
      showCloseButton: true,
      showConfirmButton: false,
    });
  };

  useEffect(() => {
    const getTutorships = async () => {
      const { data } = await axios.get(`/tutorships/${id}`);
      setState((prevState) => ({
        ...prevState,
        loading: true,
        tutorships: data,
      }));
    };

    getTutorships();
  }, [id, state.renderSwitch]);

  return (
    <div className={styles.tutorTutorshipsContainer}>
      {!state.loading ? (
        <Loader />
      ) : state.tutorships.length === 0 ? (
        <p className={styles.tutorTutorshipsTitle}>
          You don't have any pending tutorships
        </p>
      ) : (
        state.tutorships.map((tutorship, i) => {
          const { name, focus, email } = tutorship.tutor_id;
          const { status, _id: id } = tutorship;
          const studentName = tutorship.student_id.name;
          const studentPhoto = tutorship.student_id.profile_photo;
          const dateObject = new Date(tutorship.date);
          const zonedDate = utcToZonedTime(dateObject);
          const date = zonedDate
            ? format(zonedDate, "dd/MM/yyyy")
            : "Invalid date";
          const time = zonedDate ? format(zonedDate, "K:mm a") : "Invalid time";

          return (
            <div key={id} className={styles.tutorTutorshipContainer}>
              <div className={styles.tutorTutorshipImageContainer}>
                <Image
                  src={studentPhoto}
                  alt={name}
                  className={styles.tutorTutorshipImage}
                  width={100}
                  height={75}
                />
              </div>
              <div className={styles.tutorTutorshipDescriptionContainer}>
                <h2 className={styles.tutorTutorshipDescriptionTitle}>
                  {focus} tutorship with {studentName}
                </h2>
                <p className={styles.tutorTutorshipDate}>
                  Tutorship scheduled for <strong>{date}</strong> at{" "}
                  <strong>{time}</strong>
                </p>
                <div className={styles.tutorTutorshipStatusAndButtonsContainer}>
                  <div className={styles.tutorTutorshipStatusContainer}>
                    <span>STATUS: {status}</span>
                  </div>
                  <div className={styles.tutorTutorshipButtonsContainer}>
                    {status === "pending" && (
                      <button
                        onClick={(e) =>
                          handleClick(
                            { tutor: tutorship.tutor_id._id, tutorshipId: id },
                            e
                          )
                        }
                        className={styles.tutorTutorshipButtonsCancelButton}
                      >
                        Cancel
                      </button>
                    )}
                    {status === "accepted" && (
                      <>
                        <a
                          href={`mailto:${email}`}
                          className={styles.tutorTutorshipButtonsContactButton}
                        >
                          Contact
                        </a>
                        <button
                          onClick={(e) =>
                            handleClick(
                              {
                                tutor: tutorship.tutor_id._id,
                                tutorshipId: id,
                              },
                              e
                            )
                          }
                          className={styles.tutorTutorshipButtonsCompleteButton}
                        >
                          Complete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default TutorProfileTutorships;
