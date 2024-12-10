import {processLineByLine} from "../utils.js";

let input = [];

await processLineByLine('data.txt', (line) => {
  input.push(line.split('').map(v => +v));
});

const n = [[-1, 0], [0, +1], [+1, 0], [0, -1]];
const width = input[0].length;
const height = input.length;

const score = (i, j, visited = []) => {
  if (input[i][j] === 9) {
    if (!visited.includes(i*width + j)) {
      visited.push(i*width + j)
      return 1;
    }
  }
  let count = 0;
  for (let k = 0; k < n.length; k++) {
    if (i + n[k][0] >= 0 && i + n[k][0] < height && j + n[k][1] >= 0 && j + n[k][1] < width) {
      if (input[i][j] + 1 === input[i + n[k][0]][j + n[k][1]]) {
        count += score(i + n[k][0], j + n[k][1], visited);
      }
    }
  }

  return count;
}

console.time('EXECUTION')
let res = 0;
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j] === 0) {
      res += score(i, j)
    }
  }
}
console.log(res)
console.timeEnd('EXECUTION')