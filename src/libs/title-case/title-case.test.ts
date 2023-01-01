import { titleCase } from "./title-case";

describe("titleCase", () => {
  it.each([
    { input: "camelCase", expected: "Camel Case" },
    { input: "camelCaseTriple", expected: "Camel Case Triple" },
    { input: "camelCase ", expected: "Camel Case" },
    { input: "camel_case", expected: "Camel Case" },
    { input: "CamelCase", expected: "Camel Case" },
    { input: "camel Case", expected: "Camel Case" },
    { input: "Camel Case", expected: "Camel Case" },
    { input: "", expected: "" },
    { input: " ", expected: "" },
    { input: "_", expected: "" },
  ])("'$input' should transform to '$expected'", ({ input, expected }) => {
    expect(titleCase(input)).toEqual(expected);
  });
});
