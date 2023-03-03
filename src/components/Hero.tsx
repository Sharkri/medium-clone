import OpenModalButton from "./OpenModalButton";
import SignUpPage from "./SignUpPage";

function Hero() {
  return (
    <div className="bg-yellow flex justify-center">
      <div className="grow py-[25px] px-[18px] max-w-[1250px]">
        <h2 className=" text-8xl tracking-tighter mb-4 font-serif">
          Stay curious.
        </h2>
        <h3 className="text-2xl max-w-[420px] mb-[50px] text-lighterblack">
          Discover stories, thinking, and expertise from writers on any topic.
        </h3>

        <OpenModalButton
          element={<SignUpPage />}
          className="text-[20px] bg-lightblack border border-lightblack text-white rounded-full transition duration-[0.25s] w-[213px] leading-6 pt-[7px] px-[20px] pb-[9px] hover:bg-black hover:border-black"
        >
          Start reading
        </OpenModalButton>
      </div>
    </div>
  );
}

export default Hero;
