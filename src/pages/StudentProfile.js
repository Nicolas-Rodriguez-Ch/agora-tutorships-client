import StudentProfileMenu from '../components/StudentProfileMenu';
import StudentProfileEdit from '../components/StudentProfileEdit';
import PaymentMethods from '../components/PaymentMethods';
import StudentProfileTutorships from '../components/StudentProfileTutorships';
import styles from '../assets/styles/pages/StudentProfile.module.scss';

function StudentProfile({ props }) {
  const currentPage = props.match.params.section;
  const pages = {
    edit: <StudentProfileEdit />,
    'payment-methods': <PaymentMethods />,
    tutorships: <StudentProfileTutorships />,
  };

  return (
    <div className={styles.studentProfileContainer}>
      <section className={styles.studentProfileMenuContainer}>
        <StudentProfileMenu page={currentPage} />
      </section>
      <main className={styles.studentProfileMain}>{pages[currentPage]}</main>
    </div>
  );
}

export default StudentProfile;