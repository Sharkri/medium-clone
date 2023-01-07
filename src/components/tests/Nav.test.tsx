import { render, screen } from "@testing-library/react";
import ModalContext from "../modal/ModalContext";
import { MemoryRouter } from "react-router-dom";
import Nav from "../Nav";
import userEvent from "@testing-library/user-event";
import SignInPage from "../SignInPage";

it(`opens sign in modal when "Sign In" is clicked`, () => {
  const mockSetModalOpen = jest.fn();
  render(
    <MemoryRouter>
      <ModalContext.Provider
        value={{
          setModalOpen: mockSetModalOpen,
          isModalOpen: false,
          modalContent: null,
        }}
      >
        <Nav />
      </ModalContext.Provider>
    </MemoryRouter>
  );

  expect(mockSetModalOpen).not.toBeCalled();

  const signInButton = screen.getByRole("button", { name: /Sign In/i });
  userEvent.click(signInButton);

  expect(mockSetModalOpen).toBeCalledTimes(1);
  expect(mockSetModalOpen).toHaveBeenCalledWith(true, <SignInPage />);
});
