import AuthenticationForm from "./AuthenticationForm";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { getAuthInstance } from "../firebase/firebase-app";

export default function SignInWithEmail() {
  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(getAuthInstance());

  return (
    <div>
      <h2 className="font-serif text-[28px]">Sign in with email</h2>
      <p className="mb-[50px] mt-[30px] max-w-[316px]">
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
