import assert from "assert";
import { readPuzzleInput } from "../util.ts";
import type { argv0 } from "process";

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
type Rectangle = Line; //somehow...

const parse = (input: string[]): PuzzleInput => {
  const rectangles: Rectangle[] = [];
  let [x1, y1, x2, y2] = [
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
    lines.push({ a: p1, b: p2 });

    for (let j = i + 1; j < input.length; j++) {
      if (!input[j]) continue;
      [x2, y2] = input[j]!.split(",").map(Number);
      p2 = { x: x2!, y: y2! };
      rectangles.push({ a: p1, b: p2 });
    }
  }
  return { rectangles: rectangles, lines: lines };
};

const print = (rects: Rectangle[], max: Rectangle) => {
  let minX = 0;
  let maxX = 0;
  let maxY = 0;
  let minY = 0;
  for (let r of rects.map((r) => r.a)) {
    if (r.x < minX) minX = r.x;
    if (r.y < minY) minY = r.y;
    if (r.x > maxX) maxX = r.x;
    if (r.y > maxY) maxY = r.y;
  }
  const scaled: Point[] = [];
  for (let r of rects.map((r) => r.a)) {
    let px = Math.floor(((r.x - minX) / (maxX - minX)) * 100);
    let py = Math.floor(((r.y - minY) / (maxY - minY)) * 100);
    scaled.push({ x: px, y: py });
  }
  for (let y = 0; y < 100; y++) {
    let line = ``;
    for (let x = 0; x < 100; x++) {
      // TODO: find the (scaled!) points of the maximum rectangle and print it here
      if (scaled.find((p) => p.x === x && p.y === y)) line = "# " + line;
      else line = ". " + line;
    }
    console.log(line);
  }
};

const calcAreaOfRectangle = (r: Rectangle): number => {
  return (1 + Math.abs(r.b.x - r.a.x)) * (1 + Math.abs(r.b.y - r.a.y));
};

const minX = (s: Rectangle | Line): number => {
  return Math.min(s.a.x, s.b.x);
};
const maxX = (s: Rectangle | Line): number => {
  return Math.max(s.a.x, s.b.x);
};
const minY = (s: Rectangle | Line): number => {
  return Math.min(s.a.y, s.b.y);
};
const maxY = (s: Rectangle | Line): number => {
  return Math.max(s.a.y, s.b.y);
};

const lineOutsideOfRect = (line: Line, rect: Rectangle): boolean => {
  let result =
    maxX(line) <= minX(rect) ||
    minX(line) >= maxX(rect) ||
    maxY(line) <= minY(rect) ||
    minY(line) >= maxY(rect);

  return result;
};

const isValidRectangle = (rectangle: Rectangle, lines: Line[]): boolean => {
  for (let line of lines) {
    if (!lineOutsideOfRect(line, rectangle)) {
      //      console.log(
      //        `FAIL:    rect [(${rectangle.a.x},${rectangle.a.y}),(${rectangle.b.x},${rectangle.b.y})] => line [(${line.a.x},${line.a.y}),(${line.b.x},${line.b.y})]`,
      //      );
      return false;
    }
  }
  console.log(
    `SUCCESS: rect [(${rectangle.a.x},${rectangle.a.y}),(${rectangle.b.x},${rectangle.b.y})] has ${calcAreaOfRectangle(rectangle)} `,
  );
  return true;
};

const solve = (
  input: string[],
  isValid: (r: Rectangle, l: Line[]) => boolean,
): number => {
  const { rectangles, lines } = parse(input);
  let maxArea = 0;
  for (let rectangle of rectangles) {
    if (isValid(rectangle, lines)) {
      let area = calcAreaOfRectangle(rectangle);
      if (area > maxArea) maxArea = area;
    }
  }
  print(rectangles);
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
const example2 = ["4,2", "13,2", "13,4", "8,4", "8,6", "11,6", "11,10", "4,10"];
assert(solve2(example2) === 40);
console.log("example3");
const example3 = [
  "3,2",
  "13,2",
  "13,4",
  "8,4",
  "8,6",
  "11,6",
  "11,11",
  "7,11",
  "7,8",
  "5,8",
  "5,10",
  "3,10",
];
assert(solve2(example3) === 35);
console.log("example4");
const example4 = [
  "3,2",
  "17,2",
  "17,13",
  "13,13",
  "13,11",
  "15,11",
  "15,8",
  "11,8",
  "11,15",
  "18,15",
  "18,17",
  "4,17",
  "4,12",
  "6,12",
  "6,5",
  "3,5",
];
assert(solve2(example4) === 66);
console.log("example5");
const example5 = [
  "1,0",
  "3,0",
  "3,6",
  "16,6",
  "16,0",
  "18,0",
  "18,9",
  "13,9",
  "13,7",
  "6,7",
  "6,9",
  "1,9",
];

//assert(solve2(example5) === 30);
console.log(`Part 2 : ${solve2(puzzle)}`); //250496 too low
