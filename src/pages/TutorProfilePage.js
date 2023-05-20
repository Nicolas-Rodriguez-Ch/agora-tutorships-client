import TutorDashboard from "../components/TutorDashboard";
import TutorProfileEdit from "../components/TutorProfileEdit";
import TutorProfileTutorships from "../components/tutorProfileTutorships";
import TutorProfileCreateTutorship from "../components/TutorProfileCreateTutorship";
import styles from "../assets/styles/pages/TutorProfile.module.scss";
import { useRouter } from "next/router";

function TutorProfile() {
  const router = useRouter();
  const { section } = router.query;

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
    </div>
  );
}

export default TutorProfile;
