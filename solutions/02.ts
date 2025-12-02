import assert from "assert";
import { readPuzzleInput } from "../util.ts";

const puzzle = readPuzzleInput("02");
const example = [
  "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124",
];
type Range = {
  start: number;
  end: number;
};
const parse = (s: string): Range[] => {
  return s.split(",").map((s) => {
    const [a, b] = s.split("-");
    if (!a || !b) throw Error("parsing error");
    return { start: parseInt(a), end: parseInt(b) };
  });
};

const solve1 = (input: string[]): number => {
  const ranges = parse(input[0] || "");
  let sum = 0;
  for (let range of ranges) {
    for (let id = range.start; id <= range.end; id++) {
      const i = String(id);
      const a = i.substring(0, i.length / 2);
      const b = i.substring(i.length / 2);
      if (a === b) {
        sum += id;
      }
    }
  }
  return sum;
};

const solve2 = (input: string[]): any => {
  const ranges = parse(input[0] || "");
  const invalid = new Set<number>();
  for (let range of ranges) {
    for (let id = range.start; id <= range.end; id++) {
      const i = String(id);
      for (let j = 1; j <= i.length / 2; j++) {
        const pattern = i.substring(0, j);
        const test = i.replaceAll(pattern, "");
        if (test.length === 0) {
          invalid.add(id);
        }
      }
    }
  }
  return invalid.values().reduce((a, b) => a + b);
};
const ex1 = solve1(example);
assert(ex1 === 1227775554, `was ${ex1}`);
console.log(`Part 1 : ${solve1(puzzle)}`);
const ex2 = solve2(example);
assert(ex2 === 4174379265, `was ${ex2}`);
console.log(`Part 2 : ${solve2(puzzle)}`);
