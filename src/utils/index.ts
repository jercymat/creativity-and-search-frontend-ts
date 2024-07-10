/*
  range(5) => [0, 1, 2, 3, 4]
  range(5, 10) => [5, 6, 7, 8, 9]
  range(10, 12, 0.5) => [10, 10.5, 11, 11.5]
*/
export const range = (start: number, end?: number, step = 1) => {
  const output = [];
  if (typeof end == "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

/*
  Make a string's first character uppercase
*/
export function titleCase(string: string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}
