import AuthenticationForm from "./AuthenticationForm";
import "../css/SignInWithEmail.css";

export default function SignInWithEmail() {
  return (
    <div className="sign-in-with-email">
      <h2 className="serif medium-text">Sign in with email</h2>
      <p>
        Enter the email address associated with your account and enter your
        Medium password.
      </p>
      <AuthenticationForm onSubmit={() => {}} error={{}} />
    </div>
  );
}
