import {
  format,
  isThisYear,
  isThisWeek,
  formatDistanceToNowStrict,
} from "date-fns";

export default function formatDate(date: Date) {
  if (isThisWeek(date))
    return formatDistanceToNowStrict(date, { addSuffix: true });

  return format(date, `${isThisYear(date) ? "MMM d" : "MMM d, yyyy"}`);
}
