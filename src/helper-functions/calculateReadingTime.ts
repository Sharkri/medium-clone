function getWordCount(str: string) {
  return str.split(" ").filter((num) => num !== "").length;
}

export default function calculateReadingTime(...words: string[]) {
  const wordCount = words.reduce(
    (accumulator, currentVal) => accumulator + getWordCount(currentVal),
    0
  );

  // The number before the decimal is minutes and the number after is the seconds
  const divided = wordCount / 200;

  const decimals = divided % 1;
  const seconds = decimals * 0.6 * 100;
  const minutes = Math.floor(divided);

  // round up if greater than 30 sec
  if (seconds > 30) return minutes + 1;

  return minutes;
}
