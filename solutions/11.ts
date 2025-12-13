import assert from "assert";
import { readPuzzleInput } from "../util.ts";
import { console } from "inspector";

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

const example2 = [
  "svr: aaa bbb",
  "aaa: fft",
  "fft: ccc",
  "bbb: tty",
  "tty: ccc",
  "ccc: ddd eee",
  "ddd: hub",
  "hub: fff",
  "eee: dac",
  "dac: fff",
  "fff: ggg hhh",
  "ggg: out",
  "hhh: out",
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
  connections: Map<string, string[]>,
): number {
  if (current === "out") return 1;
  let found = 0;
  for (let next of connections.get(current)!) {
    found += findAllPaths(next, connections);
  }
  return found;
}

function findAllPathsWithDACandFFT(
  current: string,
  connections: Map<string, string[]>,
  dac: boolean,
  fft: boolean,
  cache: Map<string, number>,
): number {
  if (current === "out" && dac && fft) return 1;
  if (current === "out" && !(dac && fft)) return 0;
  const cacheHit = cache.get(current + dac + fft);
  if (cacheHit !== undefined) return cacheHit;
  if (current === "dac") dac = true;
  if (current === "fft") fft = true;
  let found = 0;
  for (let next of connections.get(current)!) {
    found += findAllPathsWithDACandFFT(next, connections, dac, fft, cache);
    cache.set(current + dac + fft, found);
  }
  return found;
}

function solve1(input: string[]): number {
  const connections = parse(input);
  return findAllPaths("you", connections);
}

function solve2(input: string[]): number {
  const connections = parse(input);
  return findAllPathsWithDACandFFT("svr", connections, false, false, new Map());
}

assert(solve1(example) === 5);
console.log(`Part 1 : ${solve1(puzzle)}`);
assert(solve2(example2) === 2);
console.log(`Part 2 : ${solve2(puzzle)}`);
