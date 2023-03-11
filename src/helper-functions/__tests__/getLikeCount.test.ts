import Likes from "../../interfaces/LikesInterface";
import getLikeCount from "../getLikeCount";

it("should sum like count", () => {
  const mockData: Likes = { "123abc": 42, rAndOmuserId45: 6 };

  expect(getLikeCount(mockData)).toBe(48);
});

it("should work with empty obj", () => {
  expect(getLikeCount({})).toBe(0);
});
