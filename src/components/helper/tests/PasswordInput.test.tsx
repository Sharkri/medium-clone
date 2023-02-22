import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import PasswordInput from "../PasswordInput";

const mockOnChange = jest.fn();

it("should toggle password visibility", () => {
  render(
    <PasswordInput password="Jimmy123" error={null} onChange={mockOnChange} />
  );

  const passwordInput = screen.getByLabelText(/Your password/i);

  expect(passwordInput).toHaveAttribute("type", "password");

  const toggleVisibility = screen.getByRole("button", {
    name: "toggle password visibility",
  });

  userEvent.click(toggleVisibility);

  expect(passwordInput).toHaveAttribute("type", "text");

  userEvent.click(toggleVisibility);

  expect(passwordInput).toHaveAttribute("type", "password");
});

it("should call onChange", () => {
  render(
    <PasswordInput password="Jimmy123" error={null} onChange={mockOnChange} />
  );

  const passwordInput = screen.getByLabelText(/Your password/i);
  userEvent.type(passwordInput, "a");

  expect(mockOnChange).toHaveBeenCalledWith("Jimmy123a");
});
