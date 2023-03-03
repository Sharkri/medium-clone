const CHAR_SET = "abcdefghijklmnopqrstuvwxyz0123456789";

export default function getRandomId(length: number) {
  let result = "";
  let i = length;

  while (i--) {
    const randomIndex = Math.floor(Math.random() * CHAR_SET.length);
    result += CHAR_SET[randomIndex];
  }

  return result;
}
