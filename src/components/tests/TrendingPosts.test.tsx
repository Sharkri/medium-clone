import { render } from "@testing-library/react";
import TrendingPost from "../TrendingPost";
import TrendingPosts from "../TrendingPosts";

jest.mock("../TrendingPost.tsx", () => jest.fn(() => <div>trending post</div>));

interface Post {
  title: string;
  author: { name: string; avatar: string };
  date: Date;
  id: string | number;
}

it("should map through an array of posts", () => {
  const posts: Post[] = [
    {
      title: "article name",
      author: { name: "Jimmy Donaldson", avatar: "jimmy.jpg" },
      date: new Date("12-31-1969"),
      id: "foo",
    },
    {
      title: "article name 2",
      author: { name: "fake data!", avatar: "fake-data.png" },
      date: new Date("6-2-2050"),
      id: "bar",
    },
  ];

  render(<TrendingPosts posts={posts} />);

  // First call
  expect(TrendingPost).toHaveBeenNthCalledWith(
    1,
    { post: expect.objectContaining({ id: "foo" }) },
    expect.anything()
  );
  // Second call
  expect(TrendingPost).toHaveBeenNthCalledWith(
    2,
    { post: expect.objectContaining({ id: "bar" }) },
    expect.anything()
  );
});
