export default function getLinkForPost(
  username: string,
  title: string,
  postId: string
) {
  // lowercase title + trim extra whitespace + remove non-alphanumeric + convert spaces to dash
  const linkSafeTitle = title
    .toLowerCase()
    .replace(/[\W_]+/g, " ")
    .trim()
    .replace(/ /g, "-");

  return `/${username}/posts/${linkSafeTitle}-${postId}`;
}
