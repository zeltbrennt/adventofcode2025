import assert from "assert";
import { readPuzzleInput } from "../util.ts";

const puzzle = readPuzzleInput("09");
const example = ["7,1", "11,1", "11,7", "9,7 ", "9,5 ", "2,5 ", "2,3 ", "7,3 "];

type PuzzleInput = {
  rectangles: Rectangle[];
  lines: Line[];
};
type Point = {
  x: number;
  y: number;
};
type Line = {
  a: Point;
  b: Point;
};
type Rectangle = Line;

/** A friendly line always goes from left to right or from top to bottom */
const createFriendlyLine = (p1: Point, p2: Point): Line => {
  if (p1.x === p2.x) {
    // horizontal
    if (p1.y < p2.y) return { a: p1, b: p2 };
    else return { a: p2, b: p1 };
  } else {
    //vergical
    if (p1.x < p2.x) return { a: p1, b: p2 };
    else return { a: p2, b: p1 };
  }
};
/** A friendly Rectangle always goes from top left to bottom right */
const createFriendlyRectangle = (p1: Point, p2: Point): Line => {
  if (p1.x <= p2.x && p1.y <= p2.y) {
    // friendly
    return { a: p1, b: p2 };
  } else {
    // nasty
    return { a: p2, b: p1 };
  }
};

const parse = (input: string[]): PuzzleInput => {
  const rectangles: Rectangle[] = [];
  let [x1, x2, y1, y2] = [
    ...input[0]!.split(",").map(Number),
    ...input[input.length - 1]!.split(",").map(Number),
  ];
  let [p1, p2] = [
    { x: x1!, y: y1! },
    { x: x2!, y: y2! },
  ];
  const lines: Line[] = [{ a: p1, b: p2 }];
  for (let i = 0; i < input.length - 1; i++) {
    [x1, y1] = input[i]!.split(",").map(Number);
    p1 = { x: x1!, y: y1! };
    [x2, y2] = input[i + 1]!.split(",").map(Number);
    p2 = { x: x2!, y: y2! };
    lines.push(createFriendlyLine(p1, p2));

    for (let j = i + 1; j < input.length; j++) {
      if (!input[j]) continue;
      [x2, y2] = input[j]!.split(",").map(Number);
      p2 = { x: x2!, y: y2! };
      rectangles.push(createFriendlyRectangle(p1, p2));
    }
  }
  return { rectangles: rectangles, lines: lines };
};

const calcAreaOfFriendlyRectangle = (r: Rectangle): number => {
  return (1 + r.b.x - r.a.x) * (1 + r.b.y - r.a.y);
};

const isValidRectangle = (rectangle: Rectangle, lines: Line[]): boolean => {
  return false;
};

const solve = (
  input: string[],
  isValid: (r: Rectangle, l: Line[]) => boolean,
): number => {
  const { rectangles, lines } = parse(input);
  let maxArea = 0;
  for (let rectangle of rectangles) {
    if (isValid(rectangle, lines)) {
      let area = calcAreaOfFriendlyRectangle(rectangle);
      if (area > maxArea) maxArea = area;
    }
  }
  return maxArea;
};
const solve1 = (input: string[]): number => {
  return solve(input, () => true);
};

const solve2 = (input: string[]): number => {
  return solve(input, isValidRectangle);
};

assert(solve1(example) === 50);
console.log(`Part 1 : ${solve1(puzzle)}`);
assert(solve2(example) === 24);
console.log(`Part 2 : ${solve2(puzzle)}`);
