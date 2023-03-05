import { render } from "@testing-library/react";
import OpenModalButton from "../../helper-components/OpenModalButton";
import SignInOptions from "../SignInOptions";

jest.mock("../OpenModalButton.tsx", () => jest.fn());

it('navigates to <SignUpPage /> when "No account? Create one" is clicked', () => {
  render(<SignInOptions />);

  const openModalButton = OpenModalButton as jest.Mock;

  // Should open modal with correct element
  expect(openModalButton.mock.calls[0][0]).toMatchInlineSnapshot(`
    Object {
      "children": <b
        className="text-green hover:text-dark-green leading-6 font-sohne-bold"
      >
        Create one
      </b>,
      "element": <SignUpPage />,
    }
  `);
});
