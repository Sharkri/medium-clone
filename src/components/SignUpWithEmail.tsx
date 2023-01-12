import EmailForm from "./EmailForm";
import "../css/SignUpWithEmail.css";

export default function SignUpWithEmail() {
  return (
    <div className="sign-up-with-email">
      <h2 className="serif medium-text">Sign up with email</h2>
      <p>Enter your email address to create an account.</p>
      <EmailForm onSubmit={() => {}} id="sign-up-email" />
    </div>
  );
}
