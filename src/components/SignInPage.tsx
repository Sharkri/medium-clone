import ButtonWithIcon from "./ButtonWithIcon";
import AuthenticationPage from "./AuthenticationPage";

export default function SignInPage() {
  return (
    <AuthenticationPage isSignUpPage={false}>
      <ButtonWithIcon icon="fa-brands fa-google" onClick={() => {}}>
        Sign in with Google
      </ButtonWithIcon>

      <ButtonWithIcon icon="fa-brands fa-square-facebook" onClick={() => {}}>
        Sign in with Facebook
      </ButtonWithIcon>

      <ButtonWithIcon icon="fa-brands fa-apple" onClick={() => {}}>
        Sign in with Apple
      </ButtonWithIcon>

      <ButtonWithIcon icon="fa-brands fa-twitter" onClick={() => {}}>
        Sign in with Twitter
      </ButtonWithIcon>

      <ButtonWithIcon icon="fa-regular fa-envelope" onClick={() => {}}>
        Sign in with email
      </ButtonWithIcon>
    </AuthenticationPage>
  );
}
