import StudentProfileMenu from '../components/StudentProfileMenu';
import StudentProfileEdit from '../components/StudentProfileEdit';
import PaymentMethods from '../components/PaymentMethods';
import StudentProfileTutorships from '../components/StudentProfileTutorships';
import styles from '../assets/styles/pages/StudentProfile.module.scss';
import { useRouter } from 'next/router';


function StudentProfile({ props }) {
  const router = useRouter();
  const { section } = router.query;

  const pages = {
    edit: <StudentProfileEdit />,
    'payment-methods': <PaymentMethods />,
    tutorships: <StudentProfileTutorships />,
  };

  return (
    <div className={styles.studentProfileContainer}>
      <section className={styles.studentProfileMenuContainer}>
        <StudentProfileMenu page={section} />
      </section>
      <main className={styles.studentProfileMain}>{pages[section]}</main>
    </div>
  );
}

export default StudentProfile;