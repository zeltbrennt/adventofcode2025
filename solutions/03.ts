import assert from "assert";
import { readPuzzleInput } from "../util.ts";

const puzzle = readPuzzleInput("03");
const example = [
  "987654321111111",
  "811111111111119",
  "234234234234278",
  "818181911112111",
];

const findMaxJoltage = (bank: number[]): number => {
  let [a, b] = [0, 0];
  for (let [i, battery] of bank.entries()) {
    if (battery > a && i + 1 < bank.length) {
      a = battery;
      b = 0;
    } else if (battery > b) b = battery;
  }
  console.log(`${bank} - ${a}${b}`);
  return a * 10 + b;
};

const solve1 = (input: string[]): number => {
  return input
    .map((bank) => findMaxJoltage(bank.split("").map(Number)))
    .reduce((a, b) => a + b);
};

const solve2 = (input: string[]): number => {
  return 0;
};

assert(solve1(example) === 357);
console.log(`Part 1 : ${solve1(puzzle)}`);
assert(solve2(example) === 0);
console.log(`Part 2 : ${solve2(puzzle)}`);
