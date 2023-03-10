import {
  format,
  isThisYear,
  formatDistanceToNowStrict,
  subWeeks,
  isBefore,
} from "date-fns";

export default function formatDate(
  date: Date,
  options: {
    relativeIfLast7Days?: Boolean;
    alwaysRelative?: Boolean;
    omitIfCurrentYear?: Boolean;
  } = {}
) {
  if (options.alwaysRelative || options.relativeIfLast7Days) {
    const isLast7Days = isBefore(subWeeks(new Date(), 1), date);

    if (options.alwaysRelative || isLast7Days) {
      return formatDistanceToNowStrict(date, { addSuffix: true });
    }
  }

  return format(
    date,
    `${options.omitIfCurrentYear && isThisYear(date) ? "MMM d" : "MMM d, yyyy"}`
  );
}
