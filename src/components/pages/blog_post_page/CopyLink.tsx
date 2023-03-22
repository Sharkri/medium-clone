import Dropdown from "../../helper-components/Dropdown";

export default function CopyLink({ link }: { link: string }) {
  return (
    <Dropdown
      dropdownStyles="min-w-[130px] py-[10px] px-5 grid place-items-center"
      buttonStyles="text-grey text-[17px] flex"
    >
      <i className="fa-solid fa-arrow-up-right-from-square" />

      <button
        onClick={() => navigator.clipboard.writeText(link)}
        className="text-grey text-sm hover:text-black"
      >
        <i className="fa-solid fa-link mr-2" />
        Copy link
      </button>
    </Dropdown>
  );
}
