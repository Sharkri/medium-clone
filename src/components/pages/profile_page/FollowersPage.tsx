import { useEffect, useState } from "react";
import { getUserById } from "../../../firebase/firebase-app";
import UserData from "../../../interfaces/UserDataInterface";
import FollowerUserInfo from "./FollowerUserInfo";

export default function FollowersPage({ user }: { user: UserData }) {
  const { followers } = user;

  const [followersList, setFollowersList] = useState<UserData[] | null>(null);

  useEffect(() => {
    async function fetchFollowersList() {
      const fetchedFollowers = (await Promise.all(
        followers.map((followerUid) => getUserById(followerUid))
      )) as UserData[];

      setFollowersList(fetchedFollowers);
    }

    fetchFollowersList();
  }, [followers]);

  if (followersList == null) return null;

  return (
    <div className="mt-12">
      <h1 className="text-[40px] font-sohne-semibold mb-10">
        {followers.length} Follower{followers.length > 1 && "s"}
      </h1>

      <div className="flex flex-col gap-6">
        {followersList.map((follower) => (
          <FollowerUserInfo follower={follower} key={follower.uid} />
        ))}
      </div>
    </div>
  );
}
