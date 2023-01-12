import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EmailForm from "../EmailForm";
import "@testing-library/jest-dom";

const mockId = "test-id";
const mockOnSubmit = jest.fn();

it("should render correct input values and call onSubmit with email", () => {
  render(<EmailForm onSubmit={mockOnSubmit} id={mockId} />);

  const input = screen.getByRole("textbox");

  userEvent.type(input, "john@mail.com");

  expect(input).toHaveValue("john@mail.com");

  const submit = screen.getByRole("button", { name: /Continue/i });

  userEvent.click(submit);

  expect(mockOnSubmit).toBeCalledWith("john@mail.com");
});
