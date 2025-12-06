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
  const inputCopy = [...input];
  let operators = [""];
  while (operators[0] === "") {
    // somhow example and input have different last lines
    operators = inputCopy.pop()!.trim().split(/\s+/);
  }
  const homework: Homework = { numbers: [], operators: operators };
  for (let line of inputCopy) {
    const numbers = line.trim().split(/\s+/).map(Number);
    homework.numbers.push(numbers);
  }
  return homework;
};

const parseCorrectly = (input: string[]): Homework => {
  const inputCopy = [...input];
  let operators = [""];
  while (operators[0] === "") {
    // somhow example and input have different last lines
    operators = inputCopy.pop()!.trim().split(/\s+/);
  }
  const homework: Homework = { numbers: [], operators: operators.reverse() };
  let temp = "";
  let nextTask: number[] = [];
  let taskNr = 0;
  homework.numbers.push(nextTask);
  for (let x = inputCopy[0]!.length - 1; x >= 0; x--) {
    for (let y = inputCopy.length - 1; y >= 0; y--) {
      temp = inputCopy[y]![x]! + temp;
    }
    if (temp.trim() === "") {
      homework.numbers.push([]);
      taskNr++;
    } else {
      homework.numbers[taskNr]?.push(Number(temp));
      temp = "";
    }
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
  const homework = parseCorrectly(input);
  return homework.numbers
    .map((numbers, i) => {
      return numbers.reduce((a, b) =>
        homework.operators[i] === "*" ? a * b : a + b,
      );
    })
    .reduce((a, b) => a + b);
};

assert(solve1(example) === 4277556);
console.log(`Part 1 : ${solve1(puzzle)}`);
assert(solve2(example) === 3263827);
console.log(`Part 2 : ${solve2(puzzle)}`);
