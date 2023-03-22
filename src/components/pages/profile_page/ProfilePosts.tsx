import { where } from "firebase/firestore";
import UserData from "../../../interfaces/UserDataInterface";
import Posts from "../../helper-components/Posts";

export default function ProfilePosts({ user }: { user: UserData }) {
  // only posts where author is the user
  const options = [where("authorUid", "==", user.uid)];

  return (
    <div className="px-6 flex flex-col gap-6">
      <Posts options={options} />
    </div>
  );
}
