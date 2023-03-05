import { render, screen } from "@testing-library/react";
import ModalContext from "../../modal/ModalContext";
import OpenModalButton from "../OpenModalButton";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

it("should open modal button", () => {
  const setModalOpen = jest.fn();
  render(
    <ModalContext.Provider
      value={{
        setModalOpen,
        modalContent: null,
        isModalOpen: false,
      }}
    >
      <OpenModalButton className="testy test2" element={<div>Content...</div>}>
        Hello!!
      </OpenModalButton>
    </ModalContext.Provider>
  );

  expect(setModalOpen).not.toBeCalled();

  const openModalButton = screen.getByRole("button", { name: "Hello!!" });

  expect(openModalButton).toHaveAttribute("class", "testy test2");

  userEvent.click(openModalButton);
  // should open modal with correct element/content
  expect(setModalOpen).toHaveBeenCalledWith(true, <div>Content...</div>);
});
