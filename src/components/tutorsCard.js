import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import styles from "../assets/styles/components/tutorCards.module.scss";

function TutorsCard(tutor) {
  const {
    rating,
    profile_photo,
    name,
    profession,
    focus,
    description,
    _id,
    price,
  } = tutor.props;
  const starNodes = [];

  const router = useRouter();

  for (let i = 1; i <= rating; i++) {
    starNodes.push(<FontAwesomeIcon key={i} icon={faStar} />);
  }

  function handleClick() {
    router.push(`/tutor/${_id}`);
  }

  return (
    <div
      key={_id}
      className={`${styles.card} ${styles.cardReset}`}
      onClick={handleClick}
    >
      <div className={styles.cardVisualInfo}>
        <img src={profile_photo} alt="profilepicture" />
        <h1 key={name}>{name}</h1>
        <div className={styles.cardStars}>{starNodes}</div>
        <p className={styles.price}>Tutorship fee</p>
        <p className={styles.price}>
          {price ? "COP $ " + price.toLocaleString() : "Price not assigned"}
        </p>
      </div>
      <div className={styles.cardTutorInfo}>
        <h2 key={profession}>{profession}</h2>
        <h3>{focus}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default TutorsCard;
