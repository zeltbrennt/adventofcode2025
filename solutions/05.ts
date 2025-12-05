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
      db.ranges.push({ start: start!, end: end! });
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

const solve2 = (input: string[]): number => {
  return 0;
};

assert(solve1(example) === 3);
console.log(`Part 1 : ${solve1(puzzle)}`);
assert(solve2(example) === 0);
console.log(`Part 2 : ${solve2(puzzle)}`);
