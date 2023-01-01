export const titleCase = (input: string) =>
  input
    .replace(/(_[a-z])/g, (match) => match[1].toUpperCase())
    .replace(/([A-Z])/g, " $1")
    .replace(/[_ ]+/g, " ")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
