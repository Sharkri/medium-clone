export default function getRandomId(length: number, charSet: string) {
  let result = "";
  let i = length;

  while (i--) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    result += charSet[randomIndex];
  }

  return result;
}
