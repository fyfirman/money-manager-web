import { numWords } from "./num-words";

describe("numWords", () => {
  it.each([
    { input: 0, expected: "zero" },
    { input: 1, expected: "one" },
    { input: 10, expected: "ten" },
    { input: 11, expected: "eleven" },
    { input: 11111, expected: "eleven thousand one hundred and eleven" },
  ])("'$input' should transform to '$expected'", ({ input, expected }) => {
    expect(numWords(input)).toEqual(expected);
  });

  it("should throw error when the input is more than nine digits", () => {
    expect(() => {
      numWords(1234567890);
    }).toThrowError();
  });

  it("should throw error when the input is not a number", () => {
    expect(() => {
      // @ts-expect-error --- intentionally forcing unexpected args
      numWords("forced args");
    }).toThrowError();
  });
});
