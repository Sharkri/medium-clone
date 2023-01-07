import { render } from "@testing-library/react";
import OpenModalButton from "../OpenModalButton";
import SignInPage from "../SignInPage";

jest.mock("../OpenModalButton.tsx", () => jest.fn());

it('navigates to <SignUpPage /> when "No account? Create one" is clicked', () => {
  render(<SignInPage />);

  const openModalButton = OpenModalButton as jest.Mock;

  // Should open modal with correct element
  expect(openModalButton.mock.calls[0][0]).toMatchInlineSnapshot(`
    Object {
      "children": "Create one",
      "element": <SignUpPage />,
    }
  `);
});
