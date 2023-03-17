import UserData from "../../interfaces/UserDataInterface";

export default function FollowButton({
  user,
  className,
}: {
  user: UserData;
  className?: string;
}) {
  function handleFollow() {
    if (user) {
      // TODO: IMPLEMENT FOLLOW
    }
  }

  return (
    <button className={className} onClick={handleFollow}>
      Follow
    </button>
  );
}
