import Notification from "./NotificationInterface";

export default interface PrivateUserData {
  notifications: Notification[];
  bookmarks: string[];
  email: string;
}
