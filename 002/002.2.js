import {processLineByLine} from "../utils.js";
import {isSafe} from "./utils.js";

const data = [];
await processLineByLine('data.txt', (line) => {
  data.push(line.split(' '))
});

console.time('execution')
let safeCount = 0;
for (let i = 0; i < data.length; i++) {
  if (isSafe(data[i])) {
    safeCount++;
  } else {
    for (let j = 0; j < data[i].length; j++) {
      const sliced = data[i].filter((_, k) => j !== k);
      if(isSafe(sliced)) {
        safeCount++;
        break;
      }
    }
  }
}
console.timeEnd('execution')
console.log(safeCount)