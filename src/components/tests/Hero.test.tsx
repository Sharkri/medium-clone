import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Hero from "../Hero";
import ModalContext from "../modal/ModalContext";
import SignUpPage from "../SignUpPage";

jest.mock("../SignUpModal.tsx", () => jest.fn());

it('opens sign up modal when "Start reading" button is clicked', () => {
  const setModalOpenMock = jest.fn();

  render(
    <ModalContext.Provider
      value={{
        setModalOpen: setModalOpenMock,
        isModalOpen: false,
        modalContent: null,
      }}
    >
      <Hero />
    </ModalContext.Provider>
  );

  const signUpButton = screen.getByRole("button", { name: /Start reading/ });

  userEvent.click(signUpButton);

  // should set modal open with sign up page as content
  expect(setModalOpenMock).toHaveBeenCalledTimes(1);
  expect(setModalOpenMock).toHaveBeenCalledWith(true, <SignUpPage />);
});
