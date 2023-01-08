import ButtonWithIcon from "./ButtonWithIcon";
import AuthenticationPage from "./AuthenticationPage";

export default function SignInPage() {
  return (
    <AuthenticationPage isSignUpPage={false}>
      <li>
        <ButtonWithIcon
          icon={<i className="fa-brands fa-google" />}
          text="Sign in with google"
          onClick={() => {}}
        ></ButtonWithIcon>
      </li>
      <li>
        <ButtonWithIcon
          icon={<i className="fa-brands fa-square-facebook" />}
          text="Sign up with Facebook"
          onClick={() => {}}
        ></ButtonWithIcon>
      </li>
      <li>
        <ButtonWithIcon
          icon={<i className="fa-brands fa-apple" />}
          text="Sign up with Apple"
          onClick={() => {}}
        ></ButtonWithIcon>
      </li>{" "}
      <li>
        <ButtonWithIcon
          icon={<i className="fa-brands fa-twitter" />}
          text="Sign up with Twitter"
          onClick={() => {}}
        ></ButtonWithIcon>
      </li>
      <li>
        <ButtonWithIcon
          icon={<i className="fa-regular fa-envelope" />}
          text="Sign in with email"
          onClick={() => {}}
        ></ButtonWithIcon>
      </li>
    </AuthenticationPage>
  );
}
