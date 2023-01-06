import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Hero from "../Hero";
import ModalContext from "../modal/ModalContext";
import SignUpModal from "../SignUpModal";

jest.mock("../SignUpModal.tsx", () => jest.fn());

it('opens sign up modal when "Start reading" button is clicked', () => {
  const mockToggleModal = jest.fn();

  render(
    <ModalContext.Provider
      value={{
        toggleModal: mockToggleModal,
        isModalOpen: false,
        modalContent: null,
      }}
    >
      <Hero />
    </ModalContext.Provider>
  );

  const signUpButton = screen.getByRole("button", { name: /Start reading/ });

  userEvent.click(signUpButton);

  // should toggle modal with sign up modal
  expect(mockToggleModal).toHaveBeenCalledTimes(1);
  expect(mockToggleModal).toHaveBeenCalledWith(<SignUpModal />);
});
