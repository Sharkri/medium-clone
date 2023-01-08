import { ReactNode } from "react";
import OpenModalButton from "./OpenModalButton";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import "../css/AuthenticationPage.css";

export default function AuthenticationPage({
  children,
  isSignUpPage,
}: {
  children: ReactNode;
  isSignUpPage: boolean;
}) {
  return (
    <div className="authentication-page">
      <h2 className="serif authentication-heading">
        {isSignUpPage ? "Join Medium." : "Welcome back."}
      </h2>

      <div className="authentication-page-content">
        <ul className="authentication-options">{children}</ul>

        {isSignUpPage ? (
          // If isSignUpPage, show link to redirect to <SignInPage />
          <p>
            <span>Already have an account? </span>
            <OpenModalButton element={<SignInPage />}>
              <b>Sign in</b>
            </OpenModalButton>
          </p>
        ) : (
          <p>
            <span>No account? </span>
            <OpenModalButton element={<SignUpPage />}>
              <b>Create one</b>
            </OpenModalButton>
          </p>
        )}
      </div>

      <p className="small-text">
        Click “{isSignUpPage ? "Sign Up" : "Sign In"}” to agree to Medium’s{" "}
        <span className="underline">Terms of Service</span> and acknowledge that
        Medium’s <span className="underline">Privacy Policy</span> applies to
        you.
      </p>
    </div>
  );
}
