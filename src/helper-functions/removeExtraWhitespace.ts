export default function removeExtraWhitespace(text: string) {
  // removes extra space and newlines
  return text.replace(/\n\s*\n\s*\n/g, "\n\n").replace(/  +/g, " ");
}
