import {
  format,
  isThisYear,
  formatDistanceToNowStrict,
  subWeeks,
  isBefore,
} from "date-fns";

export default function formatDate(
  date: Date,
  options: { relative?: Boolean; omitIfCurrentYear?: Boolean } = {}
) {
  const isLast7Days = isBefore(subWeeks(new Date(), 1), date);

  if (options.relative && isLast7Days)
    return formatDistanceToNowStrict(date, { addSuffix: true });

  return format(
    date,
    `${options.omitIfCurrentYear && isThisYear(date) ? "MMM d" : "MMM d, yyyy"}`
  );
}
