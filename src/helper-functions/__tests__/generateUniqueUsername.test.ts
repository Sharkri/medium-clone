import { isUsernameTaken } from "../../firebase/firebase-app";
import generateUniqueUsername from "../generateUniqueUsername";
import getRandomId from "../getRandomId";

jest.mock("../getRandomId.ts", () => jest.fn());
jest.mock("../../firebase/firebase-app.ts", () => ({
  isUsernameTaken: jest.fn(),
}));

it("should generate username with random 4 characters", async () => {
  (getRandomId as jest.Mock)
    .mockReturnValueOnce("12ab")
    .mockReturnValueOnce("amog");

  // should reject first username and accept second username
  (isUsernameTaken as jest.Mock)
    .mockReturnValueOnce(Promise.resolve(true))
    .mockReturnValueOnce(Promise.resolve(true))
    .mockReturnValueOnce(Promise.resolve(false));

  const result = await generateUniqueUsername("john@gmail.com");

  expect(result).toBe("john_amog");

  expect(getRandomId).toHaveBeenCalledWith(4);
});

it("should truncate username to maximum of 30 chars", async () => {
  (getRandomId as jest.Mock)
    .mockReturnValueOnce("12ab")
    .mockReturnValueOnce("amog");

  (isUsernameTaken as jest.Mock)
    .mockReturnValueOnce(Promise.resolve(true))
    .mockReturnValueOnce(Promise.resolve(false));

  // enter email with length 27. so that 27 + (4 unique chars) > 30 length
  const result = await generateUniqueUsername(`${"h".repeat(27)}@gmail.com`);

  expect(result.length).toBe(30);

  expect(getRandomId).toHaveBeenCalledWith(4);
});

it("should give original name if username is already unique", async () => {
  (isUsernameTaken as jest.Mock).mockReturnValueOnce(Promise.resolve(false));

  const result = await generateUniqueUsername("john@gmail.com");

  expect(result).toBe("john");
});

it("should throw error for invalid email", async () => {
  await expect(generateUniqueUsername("NotAnEmail!!!")).rejects.toThrow(
    "Invalid email"
  );
});
