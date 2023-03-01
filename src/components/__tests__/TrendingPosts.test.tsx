// import { render } from "@testing-library/react";
// import Post from "../../interfaces/PostInterface";
// import TrendingPost from "../TrendingPost";
// import TrendingPosts from "../TrendingPosts";

jest.mock("../TrendingPost.tsx", () => jest.fn(() => <div>trending post</div>));

it("should map through an array of posts", () => {
  // const posts: Post[] = [
  //   {
  //     title: "article name",
  //     author: { displayName: "Jimmy Donaldson", photoURL: "jimmy.jpg" },
  //     date: new Date("12-31-1969"),
  //     id: "foo",
  //   },
  //   {
  //     title: "article name 2",
  //     author: { displayName: "fake data!", photoURL: "fake-data.png" },
  //     date: new Date("6-2-2050"),
  //     id: "bar",
  //   },
  // ];
  // render(<TrendingPosts posts={posts} />);
  // // First call
  // expect(TrendingPost).toHaveBeenNthCalledWith(
  //   1,
  //   { post: expect.objectContaining({ id: "foo" }) },
  //   expect.anything()
  // );
  // // Second call
  // expect(TrendingPost).toHaveBeenNthCalledWith(
  //   2,
  //   { post: expect.objectContaining({ id: "bar" }) },
  //   expect.anything()
  // );
});
