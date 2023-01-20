import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "../Input";
import userEvent from "@testing-library/user-event";

const mockOnChange = jest.fn();

it("should render input attributes properly", () => {
  render(
    <Input
      error={{ code: "404", message: "not found", active: true }}
      onChange={mockOnChange}
      value="foo"
      type="text"
      required={true}
      autoComplete="text autocomplete test"
      labelText="label text test"
    />
  );

  // label text should be in document
  expect(screen.getByLabelText("label text test")).toBeInTheDocument();

  const input = screen.getByRole("textbox");

  expect(input).toHaveAttribute("required");
  expect(input).toHaveAttribute("value", "foo");
  expect(input).toHaveAttribute("autocomplete", "text autocomplete test");

  // if error is active, error message should appear
  expect(screen.getByText("not found")).toBeInTheDocument();
});

it("calls onChange with correct argument(s)", () => {
  render(
    <Input
      error={{ code: 404, message: "not found", active: true }}
      onChange={mockOnChange}
      value=""
      type="text"
      required={true}
      autoComplete="text autocomplete test"
      labelText="label text test"
    />
  );

  const input = screen.getByRole("textbox");

  userEvent.type(input, "Foo");
  expect(mockOnChange).toHaveBeenNthCalledWith(1, "F");
  expect(mockOnChange).toHaveBeenNthCalledWith(2, "o");
  expect(mockOnChange).toHaveBeenNthCalledWith(3, "o");
});

it("hides error message when error.active = false", () => {
  const isErrorActive = false;

  render(
    <Input
      error={{
        code: 404,
        message: "error 404: not found",
        active: isErrorActive,
      }}
      onChange={mockOnChange}
      value=""
      type="text"
      required={true}
      autoComplete="text autocomplete test"
      labelText="label text test"
    />
  );

  expect(screen.queryByText("error 404: not found")).not.toBeInTheDocument();
});
