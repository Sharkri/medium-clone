import { sendPasswordResetEmail } from "firebase/auth";
import { FormEvent, useState } from "react";
import { getAuthInstance } from "../../firebase/firebase-app";
import IError from "../../interfaces/ErrorInterface";
import Input from "../helper-components/Input";
import LoadingButton from "../helper-components/LoadingButton";
import ModalContent from "../modal/ModalContent";
import GoBackButton from "./GoBackButton";

export default function ForgotPasswordModal({
  onGoBack,
}: {
  onGoBack: Function;
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<IError | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!email) return;

    setLoading(true);

    try {
      await sendPasswordResetEmail(getAuthInstance(), email);
      setError(null);
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError({ message: err.message });
        setSuccess(false);
      }
    } finally {
      setLoading(false);
      setEmail("");
    }
  }

  return (
    <ModalContent className="grid place-items-center py-8 px-12 text-center max-w-[678px] max-h-[695px] w-full h-full">
      <form onSubmit={onSubmit} className="h-[90%] flex flex-col">
        <div>
          <h2 className="font-serif text-[28px]">Forgot password?</h2>
          <p className="my-5 max-w-[316px]">
            Enter the email address associated with your account and we'll send
            you reset instructions
          </p>
        </div>

        {success ? (
          <p className="text-green">
            <span className="font-sohne-semibold">
              Password reset instructions sent!
            </span>
            <p className="text-grey text-[13px]">
              Note: Email may be in spam folder
            </p>
          </p>
        ) : null}

        <div className="grow-[0.3] my-auto">
          <Input
            error={error}
            type="email"
            onChange={setEmail}
            value={email}
            autoComplete="email"
            labelText="Your email"
            required
          />

          <LoadingButton
            loading={loading}
            disabled={loading}
            type="submit"
            className="grid place-items-center mb-4 h-[42px] w-full leading-5 text-[15px] pt-2 px-4 pb-3 bg-lightblack border-lightblack text-white rounded-full transition-colors duration-[0.25s] hover:bg-black hover:border-lightblack"
          >
            Continue
          </LoadingButton>

          <GoBackButton onGoBack={onGoBack}>Back to Sign in</GoBackButton>
        </div>
      </form>
    </ModalContent>
  );
}
