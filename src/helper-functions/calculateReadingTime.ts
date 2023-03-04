export default function calculateReadingTime(wordCount: number) {
  const [minutes, decimals] = (wordCount / 200)
    .toString()
    .split(".")
    .map(Number);

  const seconds = decimals * 0.6 * 100;

  // round up
  if (seconds > 30) return minutes + 1;

  return minutes;
}
