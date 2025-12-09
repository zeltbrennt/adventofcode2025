import assert from "assert";
import { readPuzzleInput } from "../util.ts";

const puzzle = readPuzzleInput("09");
const example = ["7,1", "11,1", "11,7", "9,7 ", "9,5 ", "2,5 ", "2,3 ", "7,3 "];

type Point = {
  x: number;
  y: number;
};

const areaOfRectangle = (p1: Point, p2: Point): number => {
  return (1 + Math.abs(p1.x - p2.x)) * (1 + Math.abs(p1.y - p2.y));
};

const solve1 = (input: string[]): number => {
  let maxArea = 0;
  for (let i = 0; i < input.length - 1; i++) {
    const [x1, y1] = input[i]!.split(",").map(Number);
    const p1: Point = { x: x1!, y: y1! };
    for (let j = i + 1; j < input.length; j++) {
      if (!input[j]) continue;
      const [x2, y2] = input[j]!.split(",").map(Number);
      const p2: Point = { x: x2!, y: y2! };
      const area = areaOfRectangle(p1, p2);
      if (area > maxArea) maxArea = area;
    }
  }
  return maxArea;
};

const solve2 = (input: string[]): number => {
  return 0;
};

assert(solve1(example) === 50);
console.log(`Part 1 : ${solve1(puzzle)}`);
assert(solve2(example) === 24);
console.log(`Part 2 : ${solve2(puzzle)}`);
