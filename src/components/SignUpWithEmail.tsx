import SignUpForm from "./SignUpForm";

export default function SignUpWithEmail() {
  return (
    <div>
      <h2 className="font-serif text-[28px]">Sign up with email</h2>
      <p className="mb-[50px] mt-[30px] max-w-[316px]">
        Enter your email address and a password to create an account.
      </p>
      <SignUpForm />
    </div>
  );
}
