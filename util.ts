import { readFileSync } from "fs";

export const readPuzzleInput = (file: string): string[] => {
  return readFileSync(`./input/${file}.txt`).toString("utf8").split("\n");
};
