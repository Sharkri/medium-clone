import AuthenticationPage from "./AuthenticationPage";
import ButtonWithIcon from "./ButtonWithIcon";

export default function SignUpPage() {
  return (
    <AuthenticationPage isSignUpPage={true}>
      <li>
        <ButtonWithIcon
          icon={<i className="fa-brands fa-google" />}
          text="Sign up with google"
          onClick={() => {}}
        ></ButtonWithIcon>
      </li>
      <li>
        <ButtonWithIcon
          icon={<i className="fa-regular fa-envelope" />}
          text="Sign up with email"
          onClick={() => {}}
        ></ButtonWithIcon>
      </li>
    </AuthenticationPage>
  );
}
