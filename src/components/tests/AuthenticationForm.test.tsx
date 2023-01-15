import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthenticationForm from "../AuthenticationForm";
import "@testing-library/jest-dom";

const mockOnSubmit = jest.fn();

it("should render email and password input. And it calls onSubmit with email and pass", () => {
  render(<AuthenticationForm onSubmit={mockOnSubmit} />);

  const emailInput = screen.getByRole("textbox");

  userEvent.type(emailInput, "john@mail.com");

  expect(emailInput).toHaveValue("john@mail.com");

  const passwordInput = screen.getByLabelText(/Your password/i);

  userEvent.type(passwordInput, "password123");

  expect(passwordInput).toHaveValue("password123");

  const submitDetails = screen.getByRole("button");

  userEvent.click(submitDetails);

  expect(mockOnSubmit).toBeCalledTimes(1);
  expect(mockOnSubmit).toHaveBeenCalledWith("john@mail.com", "password123");
});
