import { useEffect, useState } from "react";
import styles from "../assets/styles/pages/StudentProfile.module.scss";
import { useRouter } from 'next/router';

function StudentProfileMenu({ page }) {
  const [selected, setSelected] = useState("Edit Profile");
  const router = useRouter();

  const handleSelect = (e) => {
    const value = e.target.id || e.target.value;
    setSelected(value);
    router.push(`/profile/${value}`, undefined, { shallow: true });
  };

  useEffect(() => {
    setSelected(page);
  }, [page]);

  return (
    <>
      <select
        onChange={handleSelect}
        className={styles.studentProfileMenuSelect + " " + styles.sm}
        value={selected}
      >
        <option className={styles.studentProfileMenuOption} value="edit">
          Edit Profile
        </option>
        <option
          className={styles.studentProfileMenuOption}
          value="payment-methods"
        >
          Payment methods
        </option>
        <option className={styles.studentProfileMenuOption} value="tutorships">
          My tutorships
        </option>
      </select>
      <section className={styles.studentProfileMenu + " " + styles.md}>
        <ul className={styles.studentProfileMenuList}>
          <div to="edit">
            <li
              onClick={handleSelect}
              id="edit"
              className={`${styles.studentProfileMenuItem} ${
                selected === "edit" ? styles.selected : ""
              }`}
            >
              Profile
            </li>
          </div>
          <div to="payment-methods">
            <li
              onClick={handleSelect}
              id="payment-methods"
              className={`${styles.studentProfileMenuItem} ${
                selected === "payment-methods" ? styles.selected : ""
              }`}
            >
              Payment Methods
            </li>
          </div>
          <div to="tutorships">
            <li
              onClick={handleSelect}
              id="tutorships"
              className={`${styles.studentProfileMenuItem} ${
                selected === "tutorships" ? styles.selected : ""
              }`}
            >
              My Tutorships
            </li>
          </div>
        </ul>
      </section>
    </>
  );
}

export default StudentProfileMenu;
