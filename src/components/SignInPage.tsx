import OpenModalButton from "./OpenModalButton";
import SignUpPage from "./SignUpPage";

export default function SignInPage() {
  return (
    <div className="sign-in-page">
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
        <OpenModalButton element={<SignUpPage />}>Create one</OpenModalButton>
      </p>
    </div>
  );
}
