import { FormEvent, useContext, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import UserContext from "../../../UserContext";
import ProfilePicture from "../../helper-components/ProfilePicture";

export default function CreateComment({
  onSubmit,
  placeholder = "What are your thoughts?",
  hideUserInfo,
}: {
  onSubmit: Function;
  placeholder?: string;
  hideUserInfo?: boolean;
}) {
  const { user } = useContext(UserContext);
  const [commentText, setCommentText] = useState("");
  const [expanded, setExpanded] = useState(true);
  const [disabled, setDisabled] = useState(false);

  function onCancel() {
    setExpanded(false);
    setCommentText("");
  }

  return (
    <form
      className={`py-[14px] shadow-[rgb(0,0,0,0.12)_0px_2px_8px]`}
      onSubmit={async (e: FormEvent) => {
        e.preventDefault();
        if (!user || !commentText || disabled) return;

        setDisabled(true);

        await onSubmit(commentText, user.uid);

        setExpanded(false);
        setDisabled(false);
        setCommentText("");
      }}
    >
      {!hideUserInfo && (
        <div
          className={`${
            !expanded && "hidden"
          } px-[14px] mb-[6px] flex items-center gap-3 
        `}
        >
          <ProfilePicture src={user?.photoURL} className="w-8 h-8" />
          <span className="text-sm">{user?.displayName}</span>
        </div>
      )}

      <div
        className={`transition-all duration-300 ${
          expanded ? "min-h-[100px] p-[14px]" : "px-[14px] flex"
        } `}
      >
        <TextareaAutosize
          placeholder={placeholder}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onClick={() => setExpanded(true)}
          className="resize-none outline-none text-sm w-full text-lighterblack"
        ></TextareaAutosize>
      </div>

      <div
        className={`${
          !expanded && "hidden"
        } text-sm flex justify-end px-[14px]`}
      >
        <button
          className="pt-1 px-3 pb-[6px] disabled:cursor-default"
          type="button"
          disabled={disabled}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="pt-1 px-3 pb-[6px] bg-green disabled:opacity-30 rounded-full text-white disabled:cursor-default"
          type="submit"
          disabled={disabled || !commentText}
        >
          Respond
        </button>
      </div>
    </form>
  );
}
