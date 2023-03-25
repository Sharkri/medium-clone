import getLinkForPost from "../getLinkForPost";

it("should get link for post", () => {
  const title = "Hello!1234(**^^";
  const username = "jimmy_123";
  const postId = "wasd123";

  const result = getLinkForPost(username, title, postId);

  expect(result).toBe("/jimmy_123/posts/hello-1234-wasd123");
});
