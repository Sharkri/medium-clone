import { Link } from "react-router-dom";

export default function Topic({
  topicName,
  className,
}: {
  topicName: string;
  className?: string;
}) {
  return (
    <Link
      to={`/tag/${topicName}`}
      className={`text-grey bg-subtle-white rounded-full hover:bg-neutral-200 transition-colors duration-300 ${className}`}
    >
      {topicName}
    </Link>
  );
}
