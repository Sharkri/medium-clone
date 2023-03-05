import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CloseModalButton from "../CloseModalButton";
import ModalContext from "../ModalContext";

it("should close modal when close modal button is clicked", () => {
  const setModalOpen = jest.fn();
  render(
    <ModalContext.Provider
      value={{
        setModalOpen,
        isModalOpen: true,
        modalContent: <div>content!</div>,
      }}
    >
      <CloseModalButton />
    </ModalContext.Provider>
  );

  expect(setModalOpen).not.toBeCalled();

  const closeModalButton = screen.getByRole("button", { name: "close" });

  userEvent.click(closeModalButton);

  // should set modal open to false
  expect(setModalOpen).toBeCalledWith(false);
});
