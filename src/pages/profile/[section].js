import { useSelector } from "react-redux";
import StudentProfile from "../StudentProfile";
import TutorProfile from "../TutorProfilePage";

function ProfileSection() {
  const role = useSelector((state) => {
    return state.user.currentUser.type;
  });
  console.log("User role:", role);
  if (role === "tutor") {
    return <TutorProfile />;
  } else {
    return <StudentProfile />;
  }
}

export default ProfileSection;
