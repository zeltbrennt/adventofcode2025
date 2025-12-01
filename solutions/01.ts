import { readPuzzleInput } from "../util.ts";

const puzzle = readPuzzleInput("01");
const example = [
  "R1000",
  "L68",
  "L30",
  "R48",
  "L5",
  "R60",
  "L55",
  "L1",
  "L99",
  "R14",
  "L82",
];

const solve1 = (input: string[]): number => {
  let value = 50;
  let code = 0;
  for (let line of input) {
    const amnt = parseInt(line.replace("R", "").replace("L", "-"));
    value = (value + amnt) % 100;
    value = value < 0 ? 100 + value : value;
    code = value === 0 ? code + 1 : code;
  }
  return code;
};

const solve2 = (input: string[]): any => {
  let value = 50;
  let code = 0;
  for (let line of input) {
    if (!line) break;
    let amnt = parseInt(line.replace("R", "").replace("L", "-"));
    const x = Math.floor(Math.abs(amnt) / 100);
    code += x;
    amnt %= 100;
    value += amnt;
    if (!(value - amnt === 0 && amnt < 0)) {
      code = value <= 0 || value >= 100 ? code + 1 : code;
    }
    value %= 100;
    value = value < 0 ? 100 + value : value;
    console.log(`dial=${line}  \tvalue=${value}  \tcode=${code}`);
  }
  return code;
};

console.log(`Part 1 example: ${solve1(example)}`);
console.log(`Part 1 puzzle : ${solve1(puzzle)}`);
console.log(`Part 2 example: ${solve2(example)}`);
console.log(`Part 2 puzzle : ${solve2(puzzle)}`);
