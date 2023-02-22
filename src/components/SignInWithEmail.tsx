import SignInForm from "./SignInForm";

export default function SignInWithEmail() {
  return (
    <div>
      <h2 className="font-serif text-[28px]">Sign in with email</h2>
      <p className="mb-[50px] mt-[30px] max-w-[316px]">
        Enter the email address associated with your account and enter your
        Medium password.
      </p>
      <SignInForm />
    </div>
  );
}
