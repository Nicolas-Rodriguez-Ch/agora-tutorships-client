import React from "react";
import axios from "../utils/axios";

import style from "../assets/styles/components/TutorCompleteTutorship.module.scss";

function TutorCancelTutorship({ swal, tutorshipId, setState }) {
  const handleClick = (e) => {
    const buttonId = e.target.id;
    if (buttonId === "cancel") {
      swal.close();
      return;
    }

    axios
      .post("/completeTutorship", {
        tutorship: tutorshipId,
        token: localStorage.getItem("token"),
      })
      .then(() => {
        const mySwal = swal.mixin({
          customClass: {
            confirmButton: "cancel-tutorship-button green",
            cancelButton: "cancel-tutorship-button red",
          },
          buttonsStyling: false,
        });

        mySwal
          .fire({
            icon: "success",
            html: (
              <h1 style={{ fontFamily: "open sans" }}>
                Tutorship completed successfully
              </h1>
            ),
            confirmButtonText: "OK",
          })
          .then(() =>
            setState((prevState) => ({
              ...prevState,
              renderSwitch: !prevState.renderSwitch,
            }))
          );
      });
  };

  return (
    <div className={style.tutorCancelTutorshipContainer}>
      <h1 className={style.tutorCompleteTutorshipTitle}>
        Are you sure you want to complete this tutorship?
      </h1>
      <h2>This action cannot be undone</h2>
      <div className={style.tutorCancelTutorshipButtonsContainer}>
        <button onClick={handleClick} id="confirm" className={style.green}>
          Yes, complete
        </button>
        <button onClick={handleClick} id="cancel" className={style.red}>
          No, return
        </button>
      </div>
    </div>
  );
}

export default TutorCancelTutorship;
