export default interface Likes {
  // [key: string] is userUid. maps to userUid -> timesLiked (number)
  [key: string]: number;
}
