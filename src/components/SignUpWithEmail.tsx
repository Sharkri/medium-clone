import CloseModalButton from "./modal/CloseModalButton";
import SignUpForm from "./SignUpForm";

export default function SignUpWithEmail() {
  return (
    <div className="grid place-items-center overflow-auto rounded bg-white py-10 px-14 shadow-lg relative text-center max-w-[678px] max-h-[695px] w-full h-full">
      <CloseModalButton />
      <h2 className="font-serif text-[28px]">Sign up with email</h2>
      <p className="mb-[50px] mt-[30px]  text-center">
        <span className="max-w-[316px]">
          Enter your email address and a password to create an account.
        </span>
      </p>
      <SignUpForm />
    </div>
  );
}
