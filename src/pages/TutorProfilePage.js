import TutorDashboard from "../components/TutorDashboard";
import TutorProfileEdit from "../components/TutorProfileEdit";
import TutorProfileTutorships from "../components/tutorProfileTutorships";
import TutorProfileCreateTutorship from "../components/TutorProfileCreateTutorship";
import styles from "../assets/styles/pages/TutorProfile.module.scss";
import { useRouter } from "next/router";
import ChatBox from "../components/ChatBox";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { startChat } from "../slices/chatSlice";
import { io } from "socket.io-client";

let socket;

function TutorProfile() {
  const router = useRouter();
  const { section } = router.query;
  const id = useSelector((state) => state.user.currentUser._id);
  const dispatch = useDispatch();

  useEffect(() => {
    socket = io(
      process.env.NEXT_PUBLIC_APP_BACKEND_URL || "http://localhost:3001"
    );

    dispatch(startChat(id));
    socket.emit("join room", { roomId: id, userId: id });

    return () => {
      socket.close();
      socket.removeAllListeners();
    };
  }, [dispatch, id]);

  const pages = {
    edit: <TutorProfileEdit />,
    "create-tutorship": <TutorProfileCreateTutorship />,
    tutorships: <TutorProfileTutorships />,
  };

  return (
    <div className={styles.tutorProfileContainer}>
      <section className={styles.tutorProfileMenuContainer}>
        <TutorDashboard page={section} />
      </section>
      <main className={styles.tutorProfileMain}>{pages[section]}</main>
      <ChatBox roomId={id}/>
    </div>
  );
}

export default TutorProfile;
