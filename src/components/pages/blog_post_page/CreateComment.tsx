import { useContext } from "react";
import TextareaAutosize from "react-textarea-autosize";
import UserContext from "../../../UserContext";
import ProfilePicture from "../../helper-components/ProfilePicture";

export default function CreateComment() {
  const { user } = useContext(UserContext);

  return (
    <div className="py-[14px] shadow-[rgb(0,0,0,0.12)_0px_2px_8px]">
      <div className="px-[14px] mb-[6px] flex items-center gap-3">
        <ProfilePicture src={user?.photoURL} className="w-8 h-8" />
        <span className="text-sm">{user?.displayName}</span>
      </div>
      <div className="p-[14px] min-h-[100px]">
        <TextareaAutosize
          placeholder="What are your thoughts?"
          className="resize-none outline-none text-sm w-full text-lighterblack"
        ></TextareaAutosize>
      </div>

      <div className="text-sm flex justify-end px-[14px]">
        <button className="pt-1 px-3 pb-[6px]">Cancel</button>
        <button className="pt-1 px-3 pb-[6px] bg-green rounded-full text-white">
          Respond
        </button>
      </div>
    </div>
  );
}
