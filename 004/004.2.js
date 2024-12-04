import {processLineByLine} from "../utils.js";

const data = [];
await processLineByLine('data.txt', (line) => {
  data.push(line)
});
const rotate = (matrix) => matrix[0].map((col, i) => matrix.map(row => row[i]).reverse())

let x = [
  ['M', 'x', 'M'],
  ['x', 'A', 'x'],
  ['S', 'x', 'S']
];
const e = [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]]

const rotations = [x];

for (let i = 1; i < 4; i++) {
  x = rotate(x);
  rotations.push(x)
}

let xCount = 0;
for (let i = 0; i < data.length - 2; i++) {
  for (let j = 0; j < data[i].length -2; j++) {
    for (let k = 0; k < rotations.length; k++) {
      let isX = true;
      for (let l = 0; l < e.length; l++) {
        if(data[i+e[l][0]][j + e[l][1]] !== rotations[k][e[l][0]][e[l][1]]) {
          isX = false;
          break;
        }
      }
      if(isX) {
        xCount++;
        break;
      }
    }
  }
}

console.log(xCount);