import AuthenticationForm from "./AuthenticationForm";
import "../css/SignInWithEmail.css";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { getAuthInstance } from "../firebase/firebase-app";

export default function SignInWithEmail() {
  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(getAuthInstance());

  return (
    <div className="sign-in-with-email">
      <h2 className="serif medium-text">Sign in with email</h2>
      <p>
        Enter the email address associated with your account and enter your
        Medium password.
      </p>
      <AuthenticationForm
        onSubmit={signInWithEmailAndPassword}
        error={error}
        loading={loading}
      />
    </div>
  );
}
