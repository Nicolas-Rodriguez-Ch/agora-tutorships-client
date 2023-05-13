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
      <div className="card-visual-info">
        <img src={profile_photo} alt="profilepicture"></img>
        <h1 key={name}>{name}</h1>
        <div className="card-stars">{starNodes}</div>
        <p className="price">Tutorship fee</p>
        <p className="price">
          {price ? "COP $ " + price.toLocaleString() : "Price not assigned"}
        </p>
      </div>
      <div className="card-tutor-info">
        <h2 key={profession}>{profession}</h2>
        <h3>{focus}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default TutorsCard;
