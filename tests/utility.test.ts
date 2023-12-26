import { wrapWithRetry } from "../src/lib/utility";

describe("testing wrap with retry", () => {
  test("function retries", () => {
    const errorFunction = jest.fn(() => {
      throw new Error("arbitrary error");
    });

    const retries = 10;
    const wrappedFunction = wrapWithRetry(errorFunction, retries);

    try {
      wrappedFunction();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("arbitrary error");
    }

    expect(errorFunction).toHaveBeenCalledTimes(11);
  });
});
