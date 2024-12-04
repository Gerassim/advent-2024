import {processLineByLine} from "../utils.js";

const data = [];
await processLineByLine('data.txt', (line) => {
  data.push(line)
});

const xmasCounter = (iShift, jShift, iWordIndex, jWordIndex) => {
  let xmasCount = 0;
  for (let i = 0; i < data.length - iShift; i++) {
    for (let j = 0; j < data[i].length - jShift; j++) {
      const string = [];
      for (let k = 0; k < 4; k++) {
        string.push(data[i + iWordIndex[k]][j + jWordIndex[k]])
      }
      if ([string.join(''), string.reverse().join('')].includes('XMAS')) {
        xmasCount++;
      }
    }
  }

  return xmasCount;
}

const asc = [0, 1, 2, 3]
const flat = [0, 0, 0, 0];

const xmasCount =
  xmasCounter(0, 3, flat, asc) +
  xmasCounter(3, 0, asc, flat) +
  xmasCounter(3, 3, asc, asc) +
  xmasCounter(3, 3, asc, asc.slice().reverse());

console.log(xmasCount)