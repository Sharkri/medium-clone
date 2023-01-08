import AuthenticationPage from "./AuthenticationPage";
import ButtonWithIcon from "./ButtonWithIcon";

export default function SignUpPage() {
  return (
    <AuthenticationPage isSignUpPage={true}>
      <li>
        <ButtonWithIcon icon="fa-brands fa-google" onClick={() => {}}>
          Sign up with Google
        </ButtonWithIcon>
      </li>
      <li>
        <ButtonWithIcon icon="fa-brands fa-square-facebook" onClick={() => {}}>
          Sign up with Facebook
        </ButtonWithIcon>
      </li>
      <li>
        <ButtonWithIcon icon="fa-regular fa-envelope" onClick={() => {}}>
          Sign up with email
        </ButtonWithIcon>
      </li>
    </AuthenticationPage>
  );
}
