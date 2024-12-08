import {processLineByLine} from "../utils.js";

const map = [];
let width;
const fqs = [];
const anodes = [];
const e = '.';
let height = 0;


await processLineByLine('test-data.txt', (line) => {
  width = line.length;
  height++;
  map.push.apply(map, line.split(''));
});

const flatToMatrix = (n) => [Math.floor(n / width), n % width]
const matrixToFlat = (c) => c[0] * width + c[1];

console.time('EXECUTION')
for (let i = 0; i < map.length; i++) {
  if (map[i] !== e) {
    if (!fqs.includes(map[i])) {
      fqs.push(map[i]);
      const cf = [flatToMatrix(i)];
      for (let j = i + 1; j < map.length; j++) {
        if (map[j] === map[i]) {
          cf.push(flatToMatrix(j))
        }
      }
      for (let j = 0; j < cf.length; j++) {
        for (let k = j + 1; k < cf.length; k++) {
          const d = [cf[k][0] - cf[j][0], cf[k][1] - cf[j][1]];
          const one = [cf[j][0] - d[0], cf[j][1] - d[1]];
          const two = [cf[k][0] + d[0], cf[k][1] + d[1]];

          if (!anodes.includes(matrixToFlat(one)) && one[0] >= 0 && one[0] < height && one[1] >= 0 && one[1] < width) {
            anodes.push(matrixToFlat(one));
          }
          if (!anodes.includes(matrixToFlat(two)) && two[0] >= 0 && two[0] < height && two[1] >= 0 && two[1] < width) {
            anodes.push(matrixToFlat(two));
          }
        }
      }
    }
  }
}
console.log(anodes.length)

console.timeEnd('EXECUTION')