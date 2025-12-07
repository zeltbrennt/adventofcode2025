import { readPuzzleInput } from "../util.ts";
import assert from "assert";

const puzzle = readPuzzleInput("07");
const example = [
  ".......S.......",
  "...............",
  ".......^.......",
  "...............",
  "......^.^......",
  "...............",
  ".....^.^.^.....",
  "...............",
  "....^.^...^....",
  "...............",
  "...^.^...^.^...",
  "...............",
  "..^...^.....^..",
  "...............",
  ".^.^.^.^.^...^.",
  "...............",
];

const parseToGrid = (input: string[]): string[][] => {
  const grid: string[][] = [];
  for (let line of input) {
    grid.push(line.split(""));
  }
  return grid;
};

const tachyonBeamSplits = (
  grid: string[][],
  row: number,
  col: number,
): boolean => {
  let split = false;

  if (grid[row]![col] === "S") {
    grid[row + 1]![col] = "|"; // start
  } else if (grid[row - 1]?.[col] === "|") {
    if (grid[row]![col] === "^") {
      // split
      if (grid[row]![col + 1] === ".") {
        grid[row]![col + 1] = "|"; //right
        split = true;
      }
      if (grid[row]![col - 1] === ".") {
        grid[row]![col - 1] = "|"; //left
        split = true;
      }
    } else {
      grid[row]![col] = "|";
    }
  }
  return split;
};

const countPaths = (
  grid: string[],
  x: number,
  y: number,
  cache: Map<string, number>,
): number => {
  if (!grid[y + 1]) return 1; // found bottom
  if (!grid[y]![x]) return 0; // out of bounds
  const cacheHit = cache.get(`${x},${y}`);
  if (cacheHit) return cacheHit; // cached result
  if (grid[y]![x] === "^") {
    const count =
      countPaths(grid, x - 1, y + 1, cache) +
      countPaths(grid, x + 1, y + 1, cache);
    cache.set(`${x},${y}`, count);
    return count;
  }
  return countPaths(grid, x, y + 1, cache);
};

const solve1 = (input: string[]): number => {
  const grid = parseToGrid(input);
  let splits = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0]!.length; j++)
      if (tachyonBeamSplits(grid, i, j)) {
        splits++;
      }
  }
  return splits;
};

const solve2 = (input: string[]): number => {
  const x = input[0]!.indexOf("S");
  let count = countPaths(input, x, 0, new Map());
  return count;
};

assert(solve1(example) === 21);
console.log(`Part 1 : ${solve1(puzzle)}`);
assert(solve2(example) === 40);
console.log(`Part 2 : ${solve2(puzzle)}`);
