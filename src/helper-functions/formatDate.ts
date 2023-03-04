import {
  format,
  isThisYear,
  isThisWeek,
  formatDistanceToNowStrict,
} from "date-fns";

export default function formatDate(
  date: Date,
  options: { relative?: Boolean; omitIfCurrentYear?: Boolean } = {}
) {
  if (options.relative && isThisWeek(date))
    return formatDistanceToNowStrict(date, { addSuffix: true });

  return format(
    date,
    `${options.omitIfCurrentYear && isThisYear(date) ? "MMM d" : "MMM d, yyyy"}`
  );
}
