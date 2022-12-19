export const dateSortComparison = (a: Date, b: Date) => b.getTime() - a.getTime();

export const stringSortComparison = (a: string, b: string) => {
  return a.localeCompare(b);
};
