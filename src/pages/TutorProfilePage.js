import TutorDashboard from '../components/TutorDashboard';
import TutorProfileEdit from '../components/TutorProfileEdit';
import TutorProfileTutorships from '../components/tutorProfileTutorships';
import TutorProfileCreateTutorship from '../components/TutorProfileCreateTutorship';
import styles from '../assets/styles/pages/TutorProfile.module.scss';

function TutorProfile({ props }) {
  const currentPage = props.match.params.section;
  const pages = {
    edit: <TutorProfileEdit />,
    'create-tutorship': <TutorProfileCreateTutorship />,
    tutorships: <TutorProfileTutorships />,
  };

  return (
    <div className={styles.tutorProfileContainer}>
      <section className={styles.tutorProfileMenuContainer}>
        <TutorDashboard page={currentPage} />
      </section>
      <main className={styles.tutorProfileMain}>{pages[currentPage]}</main>
    </div>
  );
}

export default TutorProfile;
