import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalContext from "../modal/ModalContext";
import SignInPage from "../SignInPage";
import SignUpPage from "../SignUpPage";

it("should navigate to sign up page", () => {
  const setModalOpen = jest.fn();
  render(
    <ModalContext.Provider
      value={{
        setModalOpen,
        modalContent: null,
        isModalOpen: false,
      }}
    >
      <SignInPage />
    </ModalContext.Provider>
  );

  const createAccount = screen.getByRole("button", { name: "Create one" });
  userEvent.click(createAccount);

  expect(setModalOpen).toHaveBeenCalledWith(true, <SignUpPage />);
});
