import assert from "assert";
import { readPuzzleInput } from "../util.ts";

const puzzle = readPuzzleInput("10");
const example = [
  "[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}",
  "[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2},",
  "[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}",
];

type PuzzleInput = {
  target: string;
  switchtes: number[][];
  joltage: number[];
};

type Node<T, V> = {
  depth: number;
  state: T;
  visited: V[];
};

function parse(machine: string): PuzzleInput {
  const targetPattern = /(?<=\[)[.#]+/;
  const switchPattern = /(?<=\]\s).+(?=\s{)/;
  const joltagePattern = /(?<={).+(?=})/;
  const target = machine.match(targetPattern)![0];
  const switchtes = machine
    .match(switchPattern)![0]
    .replaceAll(/[\(\)]/g, "")
    .split(" ")
    .map((s) => s.split(",").map(Number));
  const joltage = machine.match(joltagePattern)![0].split(",").map(Number);
  return { target: target, switchtes: switchtes, joltage: joltage };
}

function findShortestSequence(machine: string): number {
  const { target, switchtes } = parse(machine);
  const queue: Node<string, number[]>[] = [];
  queue.push({
    depth: 0,
    state: ".".repeat(target.length),
    visited: [],
  });
  let current: Node<string, number[]>;
  while (queue.length > 0) {
    current = queue.shift()!;
    if (current!.state === target) break;
    for (let button of switchtes) {
      if (current.visited.includes(button)) continue;
      let nextState = current!.state // TODO: make this with bit-operations instead?
        .split("")
        .map((s, i) => (button.includes(i) ? (s === "." ? "#" : ".") : s))
        .join("");
      //console.log(
      //  `target: ${target}, depth: ${current.depth + 1} transfered: ${current.state} after (${button}) to ${nextState}`,
      //);
      queue.push({
        depth: current.depth + 1,
        state: nextState,
        visited: [button, ...current.visited],
      });
    }
  }
  return current!.depth;
}

function solve1(input: string[]): number {
  //input.forEach((i) => console.log(findShortestSequence(i)));
  //return 0;
  return input
    .filter((s) => s !== "")
    .map((s) => findShortestSequence(s))
    .reduce((a, b) => a + b, 0);
}

function solve2(input: string[]): number {
  return 0;
}

assert(solve1(example) === 7);
console.log(`Part 1 : ${solve1(puzzle)}`);
assert(solve2(example) === 0);
console.log(`Part 2 : ${solve2(puzzle)}`);
