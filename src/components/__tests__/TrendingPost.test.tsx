import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TrendingPost from "../TrendingPost";

it("should render a trending post", () => {
  render(
    <TrendingPost
      post={{
        title: "title name",
        author: { displayName: "barack obama", photoURL: "obama.jpg" },
        date: new Date("1998-24-12"),
        id: "1234",
      }}
    />
  );

  expect(screen.getByText("title name")).toBeInTheDocument();
  expect(screen.getByText("barack obama")).toBeInTheDocument();
  expect(screen.getByRole("img", { name: "user avatar" })).toHaveAttribute(
    "src",
    "obama.jpg"
  );
  // TEST DATE LATER (not going to implement yet)
});
