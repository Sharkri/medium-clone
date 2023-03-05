import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "../Modal";
import ModalContext from "../ModalContext";
import "@testing-library/jest-dom";

const setModalOpen = jest.fn();

describe("Close Modal", () => {
  it("closes modal when outside of modal is clicked", () => {
    render(
      <ModalContext.Provider
        value={{
          setModalOpen,
          isModalOpen: true,
          modalContent: <div>content!</div>,
        }}
      >
        <Modal />
      </ModalContext.Provider>
    );

    expect(setModalOpen).not.toBeCalled();

    // click on modal instead of modal content
    userEvent.click(screen.getByTestId("modal"));

    expect(setModalOpen).toBeCalledWith(false);
  });
});

it("does not show modalContent when isModalOpen is false", () => {
  render(
    <ModalContext.Provider
      value={{
        setModalOpen,
        isModalOpen: false,
        modalContent: <div>content!</div>,
      }}
    >
      <Modal />
    </ModalContext.Provider>
  );

  expect(screen.queryByText("content!")).not.toBeInTheDocument();
});

it("shows modalContent when isModalOpen is true", () => {
  render(
    <ModalContext.Provider
      value={{
        setModalOpen,
        isModalOpen: true,
        modalContent: <div>content!</div>,
      }}
    >
      <Modal />
    </ModalContext.Provider>
  );

  expect(screen.getByText("content!")).toBeInTheDocument();
});
