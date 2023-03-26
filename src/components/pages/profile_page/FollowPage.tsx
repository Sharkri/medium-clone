import { useEffect, useState } from "react";
import { getUserById } from "../../../firebase/firebase-app";
import UserData from "../../../interfaces/UserDataInterface";
import FollowerUserInfo from "./FollowerUserInfo";

export default function FollowPage({
  user,
  type,
}: {
  user: UserData;
  type: "followers" | "following";
}) {
  const uids = user[type];

  const [followersList, setFollowersList] = useState<UserData[] | null>(null);

  useEffect(() => {
    async function fetchFollowersList() {
      const fetchedFollowers = (await Promise.all(
        uids.map((followerUid) => getUserById(followerUid))
      )) as UserData[];

      setFollowersList(fetchedFollowers);
    }

    fetchFollowersList();
  }, [uids]);

  if (followersList == null) return null;

  return (
    <div className="mt-12">
      <h1 className="text-[40px] font-sohne-semibold mb-10 capitalize">
        {uids.length} {type}
      </h1>

      <div className="flex flex-col gap-6">
        {followersList.length ? (
          followersList.map((follower) => (
            <FollowerUserInfo follower={follower} key={follower.uid} />
          ))
        ) : (
          <div className="flex text-grey text-lg whitespace-pre-wrap">
            <span className="line-clamp-1">{user.displayName} </span>
            <span>has no {type}.</span>
          </div>
        )}
      </div>
    </div>
  );
}
