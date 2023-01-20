import AuthenticationForm from "./AuthenticationForm";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import "../css/SignUpWithEmail.css";
import { getAuthInstance } from "../firebase/firebase-app";

export default function SignUpWithEmail() {
  // will use these vars later...
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(getAuthInstance());

  const handleSubmit = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(email, password);
  };

  return (
    <div className="sign-up-with-email">
      <h2 className="serif medium-text">Sign up with email</h2>
      <p>Enter your email address and a password to create an account.</p>
      <AuthenticationForm
        onSubmit={handleSubmit}
        error={error}
        loading={loading}
      />
    </div>
  );
}
