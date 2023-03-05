import ModalContent from "./modal/ModalContent";
import SignUpForm from "./SignUpForm";

export default function SignUpWithEmail() {
  return (
    <ModalContent className="grid place-items-center py-10 px-14 text-center max-w-[678px] max-h-[695px] w-full h-full">
      <h2 className="font-serif text-[28px]">Sign up with email</h2>
      <p className="mb-[50px] mt-[30px]  text-center">
        <span className="max-w-[316px]">
          Enter your email address and a password to create an account.
        </span>
      </p>
      <SignUpForm />
    </ModalContent>
  );
}
