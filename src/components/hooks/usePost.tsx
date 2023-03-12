import {
  useCollectionData,
  useDocumentData,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import {
  getCollectionRef,
  getPostRef,
  getUserRef,
} from "../../firebase/firebase-app";
import Comment from "../../interfaces/CommentInterface";
import Post from "../../interfaces/PostInterface";
import UserData from "../../interfaces/UserDataInterface";

export default function usePost(postId: string) {
  const postRef = postId ? getPostRef(postId) : null;
  const post = useDocumentData(postRef)[0] as Post;

  const commentRef = getCollectionRef(`posts/${postId}/comments`);
  const comments = useCollectionData(commentRef)[0] as Comment[];

  const authorRef = post ? getUserRef(post.authorUid) : null;
  const author = useDocumentDataOnce(authorRef)[0] as UserData;

  return { post, comments, author };
}
