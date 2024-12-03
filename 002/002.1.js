import {processLineByLine} from "../utils.js";
import {isSafe} from "./utils.js";

const data = [];
await processLineByLine('data.txt', (line) => {
  data.push(line.split(' '))
});

let safeCount = 0;
for (let i = 0; i < data.length; i++) {
  if (isSafe(data[i])) {
    safeCount++;
  }
}

console.log(safeCount)