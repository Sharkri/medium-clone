import { isUniqueUsername } from "../firebase/firebase-app";
import getRandomId from "./getRandomId";
async function getUniqueUsername(name: string): Promise<string> {
  const id = getRandomId(4);
  const username = `${name}_${id}`;

  const isUnique = await isUniqueUsername(username);

  // if is unique username return username, else try another username.
  return isUnique ? username : getUniqueUsername(name);
}

export default async function generateUniqueUsername(email: string) {
  // get the name from email e.g: example@mail.com --> example
  const name = email.replace(/@.*$/, "");

  if (name === email) throw new Error("Invalid email");

  // if original username is already unique
  if (await isUniqueUsername(name)) return name;

  return getUniqueUsername(name);
}