import OpenModalButton from "./OpenModalButton";
import SignInPage from "./SignInPage";
import "../css/SignUpPage.css";
import AuthenticationButton from "./AuthenticationButton";

export default function SignUpPage() {
  return (
    <div className="sign-up-page">
      <h2 className="serif sign-up-heading">Join Medium.</h2>
      <div>
        <ul>
          <li>
            <AuthenticationButton
              icon={<i className="fa-brands fa-google" />}
              text="Sign up with google"
              onClick={() => {}}
            ></AuthenticationButton>
          </li>
          <li>
            <AuthenticationButton
              icon={<i className="fa-regular fa-envelope" />}
              text="Sign up with email"
              onClick={() => {}}
            ></AuthenticationButton>
          </li>
        </ul>
        <p>
          Already have an account?{" "}
          <OpenModalButton element={<SignInPage />}>
            <b>Sign In</b>
          </OpenModalButton>
        </p>
      </div>
      <p className="small-text">
        Click “Sign Up" to agree to Medium’s{" "}
        <span className="underline">Terms of Service</span> and acknowledge that
        Medium’s <span className="underline">Privacy Policy</span> applies to
        you.
      </p>
    </div>
  );
}
