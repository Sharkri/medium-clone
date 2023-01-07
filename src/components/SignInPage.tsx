import { useContext } from "react";
import ModalContext from "./modal/ModalContext";
import SignUpPage from "./SignUpPage";

export default function SignInPage() {
  const { toggleModal } = useContext(ModalContext);
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
        <button onClick={() => toggleModal(<SignUpPage />)}>Create one</button>
      </p>
    </div>
  );
}
