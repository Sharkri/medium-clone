import { ReactNode } from "react";
import CloseModalButton from "./modal/CloseModalButton";
import OpenModalButton from "./OpenModalButton";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";

export default function AuthenticationPage({
  children,
  isSignUpPage,
}: {
  children: ReactNode;
  isSignUpPage: boolean;
}) {
  return (
    <div className="grid place-items-center overflow-auto rounded bg-white py-10 px-14 shadow-lg relative text-center max-w-[678px] max-h-[695px] w-full h-full animate-fade-scale-in">
      <CloseModalButton />

      <h2 className="font-serif tracking-[-0.03em] text-[28px]">
        {isSignUpPage ? "Join Medium." : "Welcome back."}
      </h2>

      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-[212px] flex flex-col gap-3">{children}</div>

        <p className="mt-10">
          <span>
            {isSignUpPage ? "Already have an account? " : "No account? "}
          </span>
          <OpenModalButton
            element={isSignUpPage ? <SignInPage /> : <SignUpPage />}
          >
            <b className="text-green hover:text-dark-green leading-6 font-sohne-bold">
              {isSignUpPage ? "Sign In" : "Create one"}
            </b>
          </OpenModalButton>
        </p>
      </div>

      <p className="text-[13px] text-neutral-500">
        Click “{isSignUpPage ? "Sign Up" : "Sign In"}” to agree to Medium’s{" "}
        <span className="underline cursor-pointer">Terms of Service</span> and
        acknowledge that Medium’s{" "}
        <span className="underline cursor-pointer">Privacy Policy</span> applies
        to you.
      </p>
    </div>
  );
}
