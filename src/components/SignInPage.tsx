import OpenModalButton from "./OpenModalButton";
import SignUpPage from "./SignUpPage";
import "../css/SignInPage.css";
import AuthenticationButton from "./AuthenticationButton";

export default function SignInPage() {
  return (
    <div className="sign-in-page">
      <h2 className="serif sign-in-heading">Welcome back.</h2>

      <div>
        <ul className="sign-in-options">
          <li>
            <AuthenticationButton
              icon={<i className="fa-brands fa-google" />}
              text="Sign in with google"
              onClick={() => {}}
            ></AuthenticationButton>
          </li>
          <li>
            <AuthenticationButton
              icon={<i className="fa-regular fa-envelope" />}
              text="Sign in with email"
              onClick={() => {}}
            ></AuthenticationButton>
          </li>
        </ul>
        <p>
          No account?{" "}
          <OpenModalButton element={<SignUpPage />}>
            <b>Create one</b>
          </OpenModalButton>
        </p>
      </div>

      <p className="small-text">
        Click “Sign In” to agree to Medium’s{" "}
        <span className="underline">Terms of Service</span> and acknowledge that
        Medium’s <span className="underline">Privacy Policy</span> applies to
        you.
      </p>
    </div>
  );
}
