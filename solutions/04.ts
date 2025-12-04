import assert from "assert";
import { readPuzzleInput } from "../util.ts";
import type { argv0 } from "process";

const puzzle = readPuzzleInput("04");
const example = [
  "..@@.@@@@.",
  "@@@.@.@.@@",
  "@@@@@.@.@@",
  "@.@@@@..@.",
  "@@.@@@@.@@",
  ".@@@@@@@.@",
  ".@.@.@.@@@",
  "@.@@@.@@@@",
  ".@@@@@@@@.",
  "@.@.@@@.@.",
];

type Coord = {
  x: number;
  y: number;
};

const coordAsKey = (coord: Coord): string => {
  return `x:${coord.x},y:${coord.y}`;
};

const parseInput = (input: string[]): Map<string, Coord> => {
  const coords = new Map<string, Coord>();
  for (let [y, line] of input.entries()) {
    for (let x = 0; x < input.length; x++) {
      if (line.charAt(x) === "@") {
        const coord: Coord = { x: x, y: y };
        coords.set(coordAsKey(coord), coord);
      }
    }
  }
  return coords;
};

const countNeighbours = (map: Map<string, Coord>, key: string): number => {
  let count = -1; // will always catch itself
  const index = map.get(key);
  if (!index) throw Error("this should not happen");
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (map.has(coordAsKey({ x: index.x + x, y: index.y + y }))) count++;
    }
  }
  return count;
};

const solve1 = (input: string[]): number => {
  const coordsOfPaperRolls = parseInput(input);
  return coordsOfPaperRolls
    .keys()
    .filter((key) => countNeighbours(coordsOfPaperRolls, key) < 4)
    .toArray().length;
};

const solve2 = (input: string[]): number => {
  return 0;
};

assert(solve1(example) === 13);
console.log(`Part 1 : ${solve1(puzzle)}`);
assert(solve2(example) === 0);
console.log(`Part 2 : ${solve2(puzzle)}`);
