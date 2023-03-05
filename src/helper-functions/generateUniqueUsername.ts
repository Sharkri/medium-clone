import { isUniqueUsername } from "../firebase/firebase-app";
import getRandomId from "./getRandomId";

const ID_LENGTH = 4;
const MAX_USERNAME_LEN = 30;
const SEPARATOR = "_";

async function getUniqueUsername(name: string): Promise<string> {
  const id = getRandomId(ID_LENGTH);
  const username = `${name}${SEPARATOR}${id}`;

  const isUnique = await isUniqueUsername(username);

  // if is unique username return username, else try another username.
  return isUnique ? username : getUniqueUsername(name);
}

export default async function generateUniqueUsername(email: string) {
  // get the name from email e.g: example@mail.com --> example
  let name = email.replace(/@.*$/, "");

  if (name === email) throw new Error("Invalid email");

  // max 30 characters in length for username
  if (name.length + ID_LENGTH + SEPARATOR.length > MAX_USERNAME_LEN) {
    name = name.substring(0, MAX_USERNAME_LEN - ID_LENGTH - SEPARATOR.length);
  }

  // if original username is already unique
  if (await isUniqueUsername(name)) return name;

  return getUniqueUsername(name);
}
