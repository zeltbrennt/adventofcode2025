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
    for (let idValue = range.start; idValue <= range.end; idValue++) {
      const id = String(idValue);
      const firstHalf = id.substring(0, id.length / 2);
      const secondHalf = id.substring(id.length / 2);
      if (firstHalf === secondHalf) {
        sum += idValue;
      }
    }
  }
  return sum;
};

const solve2 = (input: string[]): number => {
  const ranges = parse(input[0] || "");
  let sum = 0;
  for (let range of ranges) {
    for (let idValue = range.start; idValue <= range.end; idValue++) {
      const id = String(idValue);
      for (let endIdx = id.length / 2; endIdx > 0; endIdx--) {
        const pattern = id.substring(0, endIdx);
        const test = id.replaceAll(pattern, "");
        if (test.length === 0) {
          sum += idValue;
          break;
        }
      }
    }
  }
  return sum;
};
assert(solve1(example) === 1227775554);
console.log(`Part 1 : ${solve1(puzzle)}`);
assert(solve2(example) === 4174379265);
console.log(`Part 2 : ${solve2(puzzle)}`);
