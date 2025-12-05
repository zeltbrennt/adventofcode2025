import assert from "assert";
import { readPuzzleInput } from "../util.ts";

const puzzle = readPuzzleInput("05");
const example = [
  "3-5",
  "10-14",
  "16-20",
  "12-18",
  "",
  "1",
  "5",
  "8",
  "11",
  "17",
  "32",
];

type Range = {
  start: number;
  end: number;
  valid: boolean;
};
type Ingredient = {
  id: number;
  fresh: boolean;
};
type Database = {
  ranges: Range[];
  ingredients: Ingredient[];
};
const parseInput = (input: string[]): Database => {
  const db: Database = { ranges: [], ingredients: [] };
  for (let line of input) {
    if (line.includes("-")) {
      const [start, end] = line.split("-").map(Number);
      db.ranges.push({ start: start!, end: end!, valid: true });
    } else if (line !== "") {
      db.ingredients.push({ id: Number(line), fresh: false });
    }
  }
  return db;
};
const solve1 = (input: string[]): number => {
  const db = parseInput(input);
  let fresh = 0;
  for (let ingredient of db.ingredients) {
    for (let range of db.ranges) {
      if (ingredient.fresh) break;
      if (ingredient.id >= range.start && ingredient.id <= range.end) {
        ingredient.fresh = true;
        fresh++;
      }
    }
  }
  return fresh;
};
const combineRanges = (a: Range, b: Range): Range | undefined => {
  if (a.end < b.start || a.start > b.end) return undefined; // no overlap
  if (a.start <= b.start && a.end >= b.end) return { ...a }; // b is included in a
  if (a.start >= b.start && a.end <= b.end) return { ...b }; // a is included in b
  if (a.start < b.start) return { start: a.start, end: b.end, valid: true }; // overlap end of a
  if (a.start > b.start) return { start: b.start, end: a.end, valid: true }; //overlap end of b
  throw Error("This should not happen");
};

const solve2 = (input: string[]): number => {
  const ranges = parseInput(input).ranges;
  for (let i = 0; i < ranges.length - 1; i++) {
    let overlap = false;
    if (!ranges[i]!.valid) continue;
    for (let j = i + 1; j < ranges.length; j++) {
      if (!ranges[j]!.valid) continue;
      let temp = combineRanges(ranges[i]!, ranges[j]!);
      if (!temp) continue;
      ranges[i] = temp; // update to merged range
      ranges[j]!.valid = false; // deactivate second range
      overlap = true;
    }
    if (overlap) i = 0;
  }
  return ranges
    .filter((r) => r.valid)
    .map((r) => r.end - r.start + 1)
    .reduce((a, b) => a + b, 0);
};
assert(solve1(example) === 3);
console.log(`Part 1 : ${solve1(puzzle)}`);
assert(solve2(example) === 14);
assert(solve2([...example, "9-21"]) === 16);
console.log(`Part 2 : ${solve2(puzzle)}`);
