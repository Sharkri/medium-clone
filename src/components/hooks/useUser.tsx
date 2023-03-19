import { useEffect, useState } from "react";
import { getUserById } from "../../firebase/firebase-app";
import UserData from "../../interfaces/UserDataInterface";

export default function useUser(uid: string) {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    getUserById(uid).then((usr) => setUser(usr as UserData));
  }, [uid]);

  return user;
}
