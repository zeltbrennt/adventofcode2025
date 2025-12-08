import assert from "assert";
import { readPuzzleInput } from "../util.ts";

const puzzle = readPuzzleInput("08");
const example = [
  "162,817,812",
  "57,618,57",
  "906,360,560",
  "592,479,940",
  "352,342,300",
  "466,668,158",
  "542,29,236",
  "431,825,988",
  "739,650,466",
  "52,470,668",
  "216,146,977",
  "819,987,18",
  "117,168,530",
  "805,96,715",
  "346,949,466",
  "970,615,88",
  "941,993,340",
  "862,61,35",
  "984,92,344",
  "425,690,689",
];

type JunctionBox = {
  x: number;
  y: number;
  z: number;
  circuitId?: number;
};

type Pair = {
  left: JunctionBox;
  right: JunctionBox;
};

const toJunctionBox = (encoding: string): JunctionBox => {
  const [x, y, z] = encoding.split(",").map(Number);
  if (!x || !y || !z)
    throw Error(`Error while parsing input: x=${x},y=${y},z=${z}`);
  return { x: x, y: y, z: z };
};

const parse = (input: string[]): JunctionBox[] => {
  return input.filter((s) => s != "").map(toJunctionBox);
};

const calcDistance = (p: JunctionBox, q: JunctionBox): number => {
  return Math.sqrt(
    Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2) + Math.pow(p.z - q.z, 2),
  );
};

const createDistanceTable = (boxes: JunctionBox[]): Map<number, Pair> => {
  const distanceTable = new Map<number, Pair>();
  for (let i = 0; i < boxes.length - 1; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const [boxA, boxB] = [boxes[i]!, boxes[j]!];
      const dist = calcDistance(boxA, boxB);
      distanceTable.set(dist, { left: boxA, right: boxB });
    }
  }
  return distanceTable;
};

const toString = (box: JunctionBox): string => {
  return `[${box.x},${box.y},${box.z}]`;
};

const makeConnections = (
  distanceTable: Map<number, Pair>,
  circuits: Map<number, JunctionBox[]>,
  max: number,
) => {
  let connections = 0;
  let circuitID = 1;
  for (let [dist, pair] of [...distanceTable.entries()].sort(
    (a, b) => a[0] - b[0],
  )) {
    if (connections === max) break;
    if (!(pair.left.circuitId || pair.right.circuitId)) {
      // new circuit
      pair.left.circuitId = circuitID;
      pair.right.circuitId = circuitID;
      circuits.set(circuitID, [pair.left, pair.right]);
      circuitID++;
    } else if (!pair.left.circuitId) {
      // connect to right circuit
      pair.left.circuitId = pair.right.circuitId;
      circuits.get(pair.right.circuitId!)?.push(pair.left);
    } else if (!pair.right.circuitId) {
      // connect to right circuit
      pair.right.circuitId = pair.left.circuitId;
      circuits.get(pair.left.circuitId)?.push(pair.right);
    } else if (pair.left.circuitId !== pair.right.circuitId) {
      // merge circuits to the left
      const merged = pair.right.circuitId;
      const mergedCircuit = circuits.get(merged);
      mergedCircuit?.forEach((box) => {
        box.circuitId = pair.left.circuitId;
        circuits.get(pair.left.circuitId!)?.push(box);
      });
      circuits.delete(merged);
    }
    connections++;
  }
};

const solve1 = (input: string[], pairs: number): number => {
  const boxes = parse(input);
  const distanceTable = createDistanceTable(boxes);
  const circuits = new Map<number, JunctionBox[]>();
  makeConnections(distanceTable, circuits, pairs);
  return circuits
    .values()
    .map((c) => c.length)
    .toArray()
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a * b, 1);
};

const solve2 = (input: string[]): number => {
  return 0;
};

assert(solve1(example, 10) === 40);
console.log(`Part 1 : ${solve1(puzzle, 1000)}`);
assert(solve2(example) === 0);
console.log(`Part 2 : ${solve2(puzzle)}`);
