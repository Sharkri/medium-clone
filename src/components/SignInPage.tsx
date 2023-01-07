import OpenModalButton from "./OpenModalButton";
import SignUpPage from "./SignUpPage";
import "../css/SignInPage.css";

export default function SignInPage() {
  return (
    <div className="sign-in-page">
      <h2 className="serif sign-in-heading">Welcome back.</h2>

      <div>
        <ul>
          <li>
            <button>
              <i className="fa-brands fa-google"></i> sign in with gogle
            </button>
          </li>
          <li>
            <button>
              <i className="fa-regular fa-envelope"></i>sign in with email
            </button>
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
