import EmailForm from "./EmailForm";

export default function SignInWithEmail() {
  return (
    <div className="sign-in-with-email">
      <h2 className="serif">Sign in with email</h2>
      <p>
        Enter the email address associated with your account, and we’ll send a
        magic link to your inbox.
      </p>
      <EmailForm onSubmit={() => {}} id="sign-in-email" />
    </div>
  );
}
