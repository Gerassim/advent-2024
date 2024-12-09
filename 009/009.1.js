import {processLineByLine} from "../utils.js";

let input;
const empty = '.';

await processLineByLine('sample-data.txt', (line) => {
  input = line.split('');
});

console.time('EXECUTION')
const map = [];
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i]; j++) {
    map.push(i % 2 === 0 ? Math.floor(i / 2) : empty);
  }
}

for (let i = map.length - 1; i >= 0; i--) {
  let swapped = false;
  if(map[i] !== empty) {
    for (let j = 0; j < i; j++) {
      if (map[j] === empty) {
        map[j] = map[i];
        map[i] = empty;
        swapped = true;
        break;
      }
    }
  } else {
    swapped = true;
  }
  if (!swapped) {
    break;
  }
}

console.log(map.reduce((a, v, i) => a + ((v * i) ? v * i : 0), 0))
console.timeEnd('EXECUTION')