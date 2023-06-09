import { useSelector } from "react-redux";
import StudentProfile from "../StudentProfile";
import TutorProfile from "../TutorProfilePage";

function ProfileSection() {
  const role = useSelector((state) => {
    return state.user.currentUser.type;
  });
  if (role === "tutor") {
    return <TutorProfile />;
  } else {
    return <StudentProfile />;
  }
}

export default ProfileSection;
