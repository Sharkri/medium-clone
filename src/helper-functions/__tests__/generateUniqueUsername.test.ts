import { isUniqueUsername } from "../../firebase/firebase-app";
import generateUniqueUsername from "../generateUniqueUsername";
import getRandomId from "../getRandomId";

jest.mock("../getRandomId.ts", () => jest.fn());
jest.mock("../../firebase/firebase-app.ts", () => ({
  isUniqueUsername: jest.fn(),
}));

it("should generate username with random 4 characters", async () => {
  (getRandomId as jest.Mock)
    .mockReturnValueOnce("12ab")
    .mockReturnValueOnce("amog");

  // should reject first username and accept second username
  (isUniqueUsername as jest.Mock)
    .mockReturnValueOnce(Promise.resolve(false))
    .mockReturnValueOnce(Promise.resolve(false))
    .mockReturnValueOnce(Promise.resolve(true));

  const result = await generateUniqueUsername("john@gmail.com");

  expect(result).toBe("john_amog");

  expect(getRandomId).toHaveBeenCalledWith(
    4,
    expect.stringMatching(/^[a-z0-9]*$/)
  );
});

it("should give original name if username is already unique", async () => {
  (isUniqueUsername as jest.Mock).mockReturnValueOnce(Promise.resolve(true));

  const result = await generateUniqueUsername("john@gmail.com");

  expect(result).toBe("john");
});

it("should throw error for invalid email", async () => {
  await expect(generateUniqueUsername("NotAnEmail!!!")).rejects.toThrow(
    "Invalid email"
  );
});
