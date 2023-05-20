import { useEffect, useState } from 'react';
import styles from '../assets/styles/components/TutorDashboard.module.scss';
import { useRouter } from 'next/router';

function TutorshipDashboard({ page }) {
  const [selected, setSelected] = useState('Edit Profile');
  const router = useRouter();

  const handleSelect = (e) => {
    const value = e.target.id || e.target.value;
    setSelected(value);
    router.push(`/profile/${value}`);
  };

  useEffect(() => {
    setSelected(page);
  }, [page]);

  return (
    <>
    <select onChange={handleSelect} className={styles.tutorProfileMenuSelectSm} value={selected}>
      <option className={styles.tutorProfileMenuOption} value="edit">
        Edit Profile
      </option>
      <option className={styles.tutorProfileMenuOption} value="create-tutorship">
        Create Tutorship
      </option>
      <option className={styles.tutorProfileMenuOption} value="tutorships">
        My tutorships
      </option>
    </select>
    <section className={styles.tutorProfileMenuMd}>
      <ul className={styles.tutorProfileMenuList}>
        <div to="edit">
          <li
            onClick={handleSelect}
            id="edit"
            className={`${styles.tutorProfileMenuItem} ${selected === 'edit' && styles.selected}`}
          >
            Profile
          </li>
        </div>
        <div to="createtutorship">
          <li
            onClick={handleSelect}
            id="create-tutorship"
            className={`${styles.tutorProfileMenuItem} ${
              selected === 'create-tutorship' && styles.selected
            }`}
          >
            Create Tutorship
          </li>
        </div>
        <div to="tutorships">
          <li
            onClick={handleSelect}
            id="tutorships"
            className={`${styles.tutorProfileMenuItem} ${selected === 'tutorships' && styles.selected}`}
          >
            My Tutorships
          </li>
        </div>
      </ul>
    </section>
  </>
  );
}

export default TutorshipDashboard;
