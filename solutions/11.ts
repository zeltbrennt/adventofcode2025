import assert from "assert";
import { readPuzzleInput } from "../util.ts";

const puzzle = readPuzzleInput("11");
const example = [
  "aaa: you hhh",
  "you: bbb ccc",
  "bbb: ddd eee",
  "ccc: ddd eee fff",
  "ddd: ggg",
  "eee: out",
  "fff: out",
  "ggg: out",
  "hhh: ccc, fff iii",
  "iii: out",
];

function parse(input: string[]): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (let line of input) {
    const [key, values] = line.split(":");
    if (!key) break;
    map.set(key, values!.trim().split(" "));
  }
  return map;
}

function findAllPaths(
  current: string,
  visited: string,
  connections: Map<string, string[]>,
): number {
  if (current === "out") return 1;
  let found = 0;
  for (let next of connections.get(current)!) {
    if (visited.includes(next)) continue;
    found += findAllPaths(next, visited + current, connections);
  }
  return found;
}
function solve1(input: string[]): number {
  const connections = parse(input);
  return findAllPaths("you", "", connections);
}

function solve2(input: string[]): number {
  return 0;
}

assert(solve1(example) === 5);
console.log(`Part 1 : ${solve1(puzzle)}`);
assert(solve2(example) === 0);
console.log(`Part 2 : ${solve2(puzzle)}`);
