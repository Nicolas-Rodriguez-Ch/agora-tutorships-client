import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../utils/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import StudentCancelTutorship from "./StudentCancelTutorship";
import StudentRateTutorship from "./StudentRateTutorship";
import Loader from "./Loader";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

import styles from "../assets/styles/components/StudentProfileTutorships.module.scss";

function StudentProfileTutorships() {
  const id = useSelector((state) => state.currentUser._id);
  const [state, setState] = useState({
    tutorships: [],
    loading: true,
  });

  useEffect(() => {
    const getTutorships = async () => {
      const { data } = await axios.get(`/tutorships/${id}`);
      setState((prevState) => ({
        ...prevState,
        loading: false,
        tutorships: data,
        renderSwitch: false,
      }));
    };
    getTutorships();
  }, [id, state.renderSwitch]);

  const handleClick = async (data, e) => {
    const button = e.target.innerText;
    const mySwal = withReactContent(Swal);
    const buttons = {
      Cancel: {
        component: (
          <StudentCancelTutorship
            swal={mySwal}
            tutorshipId={data.tutorshipId}
            setState={setState}
          />
        ),
        confirm: "Yes, cancel",
        cancel: "No, return",
      },
      Rate: {
        component: (
          <StudentRateTutorship
            swal={mySwal}
            student={id}
            tutor={data.tutor}
            tutorship={data.tutorshipId}
            setState={setState}
          />
        ),
        confirm: false,
        cancel: false,
      },
    };
    const action = buttons[button];

    await mySwal.fire({
      html: action.component,
      showCloseButton: true,
      showConfirmButton: false,
    });
  };

  function handlePayment(data, e) {
    e.preventDefault();
    history.push(`/checkout/${data.tutorshipId}`, {
      state: {
        tutorship_id: data.tutorshipId,
        tutorship_price: data.tutorshipPrice,
      },
    });
  }

  return (
    <div className={styles.studentTutorshipsContainer}>
      {state.loading ? (
        <Loader />
      ) : state.tutorships.length === 0 ? (
        <p className={styles.studentTutorshipsTitle}>
          You don't have any pending tutorships
        </p>
      ) : (
        state.tutorships.map((tutorship) => {
          const { name, focus, profile_photo, email } = tutorship.tutor_id;
          const { status, _id: id, isRated } = tutorship;
          const dateObject = new Date(tutorship.date);
          const zonedDate = utcToZonedTime(dateObject);
          const date = zonedDate
            ? format(zonedDate, "dd/MM/yyyy")
            : "Invalid date";
          const time = zonedDate ? format(zonedDate, "K:mm a") : "Invalid time";

          return (
            <div key={id} className={styles.studentTutorshipContainer}>
              <div className={styles.studentTutorshipImageContainer}>
                <img
                  src={profile_photo}
                  alt={name}
                  className={styles.studentTutorshipImage}
                />
              </div>
              <div className={styles.studentTutorshipDescriptionContainer}>
                <h2 className={styles.studentTutorshipDescriptionTitle}>
                  {focus} tutorship with {name}
                </h2>
                <p className={styles.studentTutorshipDate}>
                  Tutorship scheduled for <strong>{date}</strong> at{" "}
                  <strong>{time}</strong>
                </p>
                <div
                  className={styles.studentTutorshipStatusAndButtonsContainer}
                >
                  <div className={styles.studentTutorshipStatusContainer}>
                    <span>STATUS: {status}</span>
                  </div>
                  <div className={styles.studentTutorshipButtonsContainer}>
                    {status === "pending" && (
                      <>
                        <button
                          onClick={(e) =>
                            handlePayment(
                              {
                                tutorshipPrice: tutorship.tutor_id.price,
                                tutorshipId: id,
                              },
                              e
                            )
                          }
                          className={styles.studentTutorshipButtonsPayButton}
                        >
                          Pay
                        </button>
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
                          className={styles.studentTutorshipButtonsCancelButton}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {status === "accepted" && (
                      <a
                        href={`mailto:${email}`}
                        className={styles.studentTutorshipButtonsContactButton}
                      >
                        Contact
                      </a>
                    )}
                    {status === "completed" && !isRated && (
                      <button
                        onClick={(e) =>
                          handleClick(
                            { tutor: tutorship.tutor_id._id, tutorshipId: id },
                            e
                          )
                        }
                        className={styles.studentTutorshipButtonsRateButton}
                      >
                        Rate
                      </button>
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

export default StudentProfileTutorships;
