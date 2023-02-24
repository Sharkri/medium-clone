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
      "children": <b
        className="text-[#1a8917] hover:text-[#0f730c] leading-6 font-bold"
      >
        Create one
      </b>,
      "element": <SignUpPage />,
    }
  `);
});
