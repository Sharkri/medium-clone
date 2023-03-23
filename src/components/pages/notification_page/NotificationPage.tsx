import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserById, updateUser } from "../../../firebase/firebase-app";
import formatDate from "../../../helper-functions/formatDate";
import UserData from "../../../interfaces/UserDataInterface";
import UserContext from "../../../UserContext";
import ProfilePicture from "../../helper-components/ProfilePicture";
import ScrollerItems from "../../helper-components/ScrollerItems";

interface FetchedNotification {
  user: UserData;
  message: string;
  timestamp: string;
}

export default function NotificationPage() {
  const { user: currentUser, isAnonymous } = useContext(UserContext);

  const [notifications, setNotifications] = useState<
    FetchedNotification[] | null
  >(null);

  useEffect(() => {
    async function fetchNotifications() {
      if (!currentUser?.notifications) return;

      const fetchedNotifications = await Promise.all(
        currentUser.notifications.map(async ({ uid, message, timestamp }) => {
          const user = (await getUserById(uid)) as UserData;
          if (!user) return;

          const formatted = formatDate(timestamp.toDate(), {
            omitIfCurrentYear: true,
            relativeIfLast7Days: true,
          });

          return { message, user, timestamp: formatted };
        })
      );

      setNotifications(fetchedNotifications as FetchedNotification[]);
    }

    fetchNotifications();
  }, [currentUser?.notifications]);

  function clearNotifications() {
    if (!currentUser) return;
    updateUser(currentUser.uid, { bookmarks: [] });
  }

  if (notifications == null && !isAnonymous) return null;

  return (
    <div className="mx-6 mt-12">
      <div className="max-w-[728px] mx-auto">
        <h1 className="font-sohne-semibold text-[42px] break-all mb-10 max-md:text-[22px]">
          Notifications
        </h1>

        <ScrollerItems className="w-full">
          <button className="highlight">All notifications</button>
        </ScrollerItems>

        {notifications?.map(({ user, message, timestamp }) => (
          <Link
            to={`/u/${user.username}`}
            className="flex gap-4 items-center p-5 text-sm"
          >
            <ProfilePicture src={user.photoURL} className="w-8 h-8" />
            <div>
              <p className="text-sm">
                {user.displayName}
                <span className="text-grey"> {message}</span>
              </p>
              <p className="text-grey">{timestamp}</p>
            </div>
          </Link>
        ))}

        {notifications?.length ? (
          <button
            className="text-green text-sm px-5 my-2"
            onClick={clearNotifications}
          >
            Clear all notifications
          </button>
        ) : (
          <p className="text-grey text-sm text-center mt-4">
            You're all caught up.
          </p>
        )}
      </div>
    </div>
  );
}
