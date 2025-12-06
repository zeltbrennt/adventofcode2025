import assert from "assert";
import { readPuzzleInput } from "../util.ts";

const puzzle = readPuzzleInput("06");
const example = [
  "123 328  51 64 ",
  " 45 64  387 23 ",
  "  6 98  215 314",
  "*   +   *   +  ",
];

type Homework = {
  numbers: number[][];
  operators: string[];
};

const parse = (input: string[]): Homework => {
  let operators = [""];
  while (operators[0] === "") {
    // somhow example and input have different last lines
    operators = input.pop()!.trim().split(/\s+/);
  }
  const homework: Homework = { numbers: [], operators: operators };
  for (let line of input) {
    const numbers = line.trim().split(/\s+/).map(Number);
    homework.numbers.push(numbers);
  }
  return homework;
};

const solve1 = (input: string[]): number => {
  const homework = parse(input);
  let sum = 0;
  for (let i = 0; i < homework.numbers[0]!.length; i++) {
    sum += homework.numbers
      .map((n) => n[i]!)
      .reduce((p, c) => (homework.operators[i] === "*" ? p * c : p + c));
  }

  return sum;
};

const solve2 = (input: string[]): number => {
  return 0;
};

assert(solve1(example) === 4277556);
console.log(`Part 1 : ${solve1(puzzle)}`);
assert(solve2(example) === 0);
console.log(`Part 2 : ${solve2(puzzle)}`);
