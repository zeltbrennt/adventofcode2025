import assert from "assert";
import { readPuzzleInput } from "../util.ts";

const puzzle = readPuzzleInput("10");
const example = [
  "[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}",
  "[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2},",
  "[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}",
];

function findShortestSequence(machine: string): number {
  return 0;
}

function solve1(input: string[]): number {
  return input.map((s) => findShortestSequence(s)).reduce((a, b) => a + b, 0);
}

function solve2(input: string[]): number {
  return 0;
}

assert(solve1(example) === 7);
console.log(`Part 1 : ${solve1(puzzle)}`);
assert(solve2(example) === 0);
console.log(`Part 2 : ${solve2(puzzle)}`);
