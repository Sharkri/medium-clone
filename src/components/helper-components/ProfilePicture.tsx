export default function ProfilePicture({
  src,
  className = "",
}: {
  src: string | null | undefined;
  className: string;
}) {
  const defaultProfilePic = require("../../assets/images/default-profile.png");

  return (
    <img
      src={src || defaultProfilePic}
      alt="user profile"
      referrerPolicy="no-referrer"
      className={`rounded-full ${className}`}
    />
  );
}
