import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthenticationForm from "../AuthenticationForm";
import "@testing-library/jest-dom";

const mockOnSubmit = jest.fn();

it("should render email and password input. And it calls onSubmit with email and pass", () => {
  render(
    <AuthenticationForm
      onSubmit={mockOnSubmit}
      error={undefined}
      loading={false}
    />
  );

  const emailInput = screen.getByRole("textbox");

  userEvent.type(emailInput, "john@mail.com");

  expect(emailInput).toHaveValue("john@mail.com");

  const passwordInput = screen.getByLabelText(/Your password/i);

  userEvent.type(passwordInput, "password123");

  expect(passwordInput).toHaveValue("password123");

  const submitDetails = screen.getByRole("button", { name: "Continue" });

  userEvent.click(submitDetails);

  expect(mockOnSubmit).toBeCalledTimes(1);
  expect(mockOnSubmit).toHaveBeenCalledWith("john@mail.com", "password123");
});

it("should toggle password visibility", () => {
  render(
    <AuthenticationForm
      onSubmit={mockOnSubmit}
      error={undefined}
      loading={false}
    />
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

describe("Loading", () => {
  it("adds data-loading to button when isLoading", () => {
    const isLoading = true;

    render(
      <AuthenticationForm
        onSubmit={mockOnSubmit}
        error={undefined}
        loading={isLoading}
      />
    );

    expect(screen.getByRole("button", { name: "Continue" })).toHaveAttribute(
      "data-loading",
      "true"
    );
  });

  it("removes data-loading to button when not loading", () => {
    const isLoading = false;

    render(
      <AuthenticationForm
        onSubmit={mockOnSubmit}
        error={undefined}
        loading={isLoading}
      />
    );

    expect(screen.getByRole("button", { name: "Continue" })).toHaveAttribute(
      "data-loading",
      "false"
    );
  });
});
