import { Link } from "react-router-dom";
import { app } from "../firebaseApp";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const onSignOut = async () => {
  try {
    const auth = getAuth(app);
    await signOut(auth);
    toast.success("로그아웃 되었습니다.");
  } catch (error: any) {
    console.log(error);
    toast.error(error?.code);
  }
};

export default function Profile() {
  const auth = getAuth(app);
  console.log("profile auth", auth);
  return (
    <div className="profile__box">
      <div className="flex__box-lg">
        <div className="profile__image" />
        <div>
          <div className="profile__email">{auth?.currentUser?.email}</div>
          <div className="profile__name">
            {auth?.currentUser?.displayName || "사용자"}
          </div>
        </div>
      </div>
      <Link to="/" className="profile__logout" onClick={onSignOut}>
        로그아웃
      </Link>
    </div>
  );
}
