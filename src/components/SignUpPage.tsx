import OpenModalButton from "./OpenModalButton";
import SignInPage from "./SignInPage";

export default function SignUpPage() {
  return (
    <div className="sign-up-page">
      <ul>
        <li>
          <button>
            <i className="fa-brands fa-google"></i> sign up with gogle
          </button>
        </li>
        <li>
          <button>
            <i className="fa-regular fa-envelope"></i>sign up with email
          </button>
        </li>
      </ul>
      <p>
        Already have an account?{" "}
        <OpenModalButton element={<SignInPage />}>Sign In</OpenModalButton>
      </p>
    </div>
  );
}
