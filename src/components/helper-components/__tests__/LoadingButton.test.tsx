import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import LoadingButton from "../LoadingButton";
import userEvent from "@testing-library/user-event";

jest.mock("../Spinner.tsx", () => () => <div>loading...</div>);

it("should call onClick and have correct attributes", () => {
  const mockOnClick = jest.fn();

  render(
    <LoadingButton
      type="submit"
      loading={false}
      onClick={mockOnClick}
      className="hello"
    >
      Test Button
    </LoadingButton>
  );

  const button = screen.getByText("Test Button");

  expect(button).toHaveAttribute("type", "submit");
  expect(button).toHaveClass("hello");

  expect(mockOnClick).not.toHaveBeenCalled();

  userEvent.click(button);

  expect(mockOnClick).toHaveBeenCalled();
});

it("adds spinner to button when isLoading", () => {
  const isLoading = true;

  render(
    <LoadingButton type="button" loading={isLoading} className="xd">
      Test Button
    </LoadingButton>
  );

  expect(screen.getByText("loading...")).toBeInTheDocument();
});

it("removes spinner to button when not loading", () => {
  const isLoading = false;

  render(
    <LoadingButton type="button" loading={isLoading} className="xd">
      Test Button
    </LoadingButton>
  );

  expect(screen.queryByText("loading...")).not.toBeInTheDocument();
});
