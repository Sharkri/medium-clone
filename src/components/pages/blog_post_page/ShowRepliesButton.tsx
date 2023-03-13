export default function ShowRepliesButton({
  isOpen,
  onClick,
  replyCount,
}: {
  isOpen: boolean;
  onClick: Function;
  replyCount: number;
}) {
  return (
    <button
      className="flex items-center gap-2 text-sm text-lighterblack"
      onClick={() => onClick()}
    >
      <i className="fa-regular fa-comment text-[1.2rem] rotate-y-180 thinner-icon" />
      {isOpen ? "Hide replies" : `${replyCount} replies`}
    </button>
  );
}
