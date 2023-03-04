import CloseModalButton from "./modal/CloseModalButton";
import SignInForm from "./SignInForm";

export default function SignInWithEmail() {
  return (
    <div className="grid place-items-center overflow-auto rounded bg-white py-10 px-14 shadow-lg relative text-center max-w-[678px] max-h-[695px] w-full h-full">
      <CloseModalButton />
      <h2 className="font-serif text-[28px]">Sign in with email</h2>
      <p className="mb-[50px] mt-[30px] max-w-[316px]">
        Enter the email address associated with your account and enter your
        Medium password.
      </p>
      <SignInForm />
    </div>
  );
}
