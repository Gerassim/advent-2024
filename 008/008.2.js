import {processLineByLine} from "../utils.js";

const map = [];
let width;
const fqs = [];
const anodes = [];
const e = '.';
let height = 0;


await processLineByLine('data.txt', (line) => {
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

          let back = [cf[j][0] - d[0], cf[j][1] - d[1]];
          while (back[0] >= 0 && back[0] < height && back[1] >= 0 && back[1] < width) {
            if (!anodes.includes(matrixToFlat(back))) {
              anodes.push(matrixToFlat(back));
            }
            back = [back[0]-d[0], back[1] - d[1]];
          }

          let forward = [cf[j][0], cf[j][1]];
          while (forward[0] >= 0 && forward[0] < height && forward[1] >= 0 && forward[1] < width) {
            if (!anodes.includes(matrixToFlat(forward))) {
              anodes.push(matrixToFlat(forward));
            }
            forward = [forward[0]+d[0], forward[1] + d[1]];
          }
        }
      }
    }
  }
}
console.log(anodes.length)

console.timeEnd('EXECUTION')