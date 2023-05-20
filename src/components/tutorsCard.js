import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import styles from "../assets/styles/components/tutorCards.module.scss";
import Image from "next/image";
import Link from "next/link";

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


  return (
    <Link href={`/tutor/${_id}`}>
      <div
        key={_id}
        className={`${styles.card} ${styles.cardReset}`}
      >
        <div className={styles.cardVisualInfo}>
          <Image
            src={profile_photo}
            alt="profilepicture"
            width={100}
            height={75}
          />
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
    </Link>
  );
}

export default TutorsCard;
