import Likes from "../interfaces/LikesInterface";

export default function getLikeCount(likes: Likes) {
  return Object.values(likes).reduce(
    (accumulator, currentVal) => accumulator + currentVal,
    0
  );
}
