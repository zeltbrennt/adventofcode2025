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
  return a * 10 + b;
};

// I don't feel like being clever today...
const findMaxJoltage12 = (bank: number[]): number => {
  let batteries = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let [i, battery] of bank.entries()) {
    if (battery > batteries[0]! && i + 11 < bank.length) {
      batteries[0] = battery;
      batteries.fill(0, 1);
    } else if (battery > batteries[1]! && i + 10 < bank.length) {
      batteries[1] = battery;
      batteries.fill(0, 2);
    } else if (battery > batteries[2]! && i + 9 < bank.length) {
      batteries[2] = battery;
      batteries.fill(0, 3);
    } else if (battery > batteries[3]! && i + 8 < bank.length) {
      batteries[3] = battery;
      batteries.fill(0, 4);
    } else if (battery > batteries[4]! && i + 7 < bank.length) {
      batteries[4] = battery;
      batteries.fill(0, 5);
    } else if (battery > batteries[5]! && i + 6 < bank.length) {
      batteries[5] = battery;
      batteries.fill(0, 6);
    } else if (battery > batteries[6]! && i + 5 < bank.length) {
      batteries[6] = battery;
      batteries.fill(0, 7);
    } else if (battery > batteries[7]! && i + 4 < bank.length) {
      batteries[7] = battery;
      batteries.fill(0, 8);
    } else if (battery > batteries[8]! && i + 3 < bank.length) {
      batteries[8] = battery;
      batteries.fill(0, 9);
    } else if (battery > batteries[9]! && i + 2 < bank.length) {
      batteries[9] = battery;
      batteries.fill(0, 10);
    } else if (battery > batteries[10]! && i + 1 < bank.length) {
      batteries[10] = battery;
      batteries.fill(0, 11);
    } else if (battery > batteries[11]!) {
      batteries[11] = battery;
    }
  }
  return Number(batteries.map(String).join(""));
};

const solve1 = (input: string[]): number => {
  return input
    .map((bank) => findMaxJoltage(bank.split("").map(Number)))
    .reduce((a, b) => a + b);
};

const solve2 = (input: string[]): number => {
  return input
    .map((bank) => findMaxJoltage12(bank.split("").map(Number)))
    .reduce((a, b) => a + b);
};

assert(solve1(example) === 357);
console.log(`Part 1 : ${solve1(puzzle)}`);
assert(solve2(example) === 3121910778619);
console.log(`Part 2 : ${solve2(puzzle)}`);
