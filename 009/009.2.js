import {processLineByLine} from "../utils.js";

let input;
const empty = '.';

await processLineByLine('data.txt', (line) => {
  input = line.split('').map(v => +v);
});

console.time('EXECUTION')
let map = [];
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i]; j++) {
    map.push(i % 2 === 0 ? Math.floor(i / 2) : empty);
  }
}

for (let i = input.length - 1; i >= 0; i--) {
  if (i % 2 === 0) {
    const id = i / 2;
    const len = input[i];
    const pos = map.indexOf(id)
    let emptyLen = 0;
    for (let j = 0; j < pos; j++) {
      if(map[j] === '.') {
        emptyLen++;
        if(emptyLen === len) {
          for (let k = 0; k < len; k++) {
            map[pos+k] = '.';
            map[j-emptyLen+k+1] = id;
          }
          break;
        }
      } else {
        emptyLen = 0;
      }
    }
  }
}


console.log(map.reduce((a, v, i) => a + ((v * i) ? v * i : 0), 0))
console.timeEnd('EXECUTION')