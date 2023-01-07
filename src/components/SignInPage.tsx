import OpenModalButton from "./OpenModalButton";
import SignUpPage from "./SignUpPage";
import "../css/SignInPage.css";

export default function SignInPage() {
  return (
    <div className="sign-in-page">
      <h2 className="serif sign-in-heading">Welcome back.</h2>
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
  );
}
