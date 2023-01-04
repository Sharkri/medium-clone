import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TrendingPost from "../TrendingPost";

it("should render a trending post", () => {
  render(
    <TrendingPost
      post={{
        title: "title name",
        author: "barack obama",
        date: new Date("1998-24-12"),
        id: "1234",
      }}
    />
  );

  expect(screen.getByText("title name")).toBeInTheDocument();
  expect(screen.getByText("barack obama")).toBeInTheDocument();
  // TEST DATE LATER (not going to implement yet)
});
