const a = [
  "",
  "one ",
  "two ",
  "three ",
  "four ",
  "five ",
  "six ",
  "seven ",
  "eight ",
  "nine ",
  "ten ",
  "eleven ",
  "twelve ",
  "thirteen ",
  "fourteen ",
  "fifteen ",
  "sixteen ",
  "seventeen ",
  "eighteen ",
  "nineteen ",
];

const b = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

const regex = /^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/;

const getLT20 = (n: string) => a[Number(n)];
const getGT20 = (n: string) => `${b[n[0] as any]} ${a[n[1] as any]}`;

/**
 * Converts the given number to words
 *
 * This function attempts to convert the given input number to words.
 * It throws an error if the input number is greater than 9 digits or if the
 * number is not match with the regex.
 *
 * Source : https://github.com/salmanm/num-words/blob/master/index.js
 *
 * @param input - number to be converted.
 * @returns the given number in words.
 */
export function numWords(input: number) {
  const num = Number(input);
  if (isNaN(num)) return "";
  if (num === 0) return "zero";

  const numStr = num.toString();
  if (numStr.length > 9) {
    throw new Error("Overflow number. Cannot support converting more than 9 digits ");
  }

  const result = `000000000${numStr}`.substr(-9).match(regex); // TODO: update deprecated function

  if (!result) {
    throw new Error("The number is not match with regex");
  }

  const [, n1, n2, n3, n4, n5] = result;

  let str = "";
  str += n1 !== "0" ? `${getLT20(n1) || getGT20(n1)}crore ` : "";
  str += n2 !== "0" ? `${getLT20(n2) || getGT20(n2)}lakh ` : "";
  str += n3 !== "0" ? `${getLT20(n3) || getGT20(n3)}thousand ` : "";
  str += n4 !== "0" ? `${getLT20(n4)}hundred ` : "";
  str += n5 !== "0" && str !== "" ? "and " : "";
  str += n5 !== "0" ? getLT20(n5) || getGT20(n5) : "";

  return str.trim();
}
