import {processLineByLine} from "../utils.js";

const rows = [];

await processLineByLine('data.txt', (line) => {
  rows.push(line.split(': ').map((v, i) => i > 0 ? v.split(' ').map(v => +v) : v).map((v, i) => i === 0 ? +v : v))
});

const sum = (a, b) => a + b;
const mult = (a, b) => a * b;
const concat = (a, b) => a * Math.pow(10, Math.floor(Math.log10(b) + 1)) + b

const evaluate = (sums, arr, goal) => {
  if (arr.length > 0 && sums.length > 0) {
    const newData = [];
    for (let i = 0; i < sums.length; i++) {
      const c = concat(sums[i], arr[0]);
      if (c <= goal) {
        if(c === goal) {
          return goal;
        }
        newData.push(c)
      }
      const s = sum(sums[i], arr[0]);
      if ( s<= goal) {
        if(s === goal) {
          return goal;
        }
        newData.push(s)
      }
      const m = mult(sums[i], arr[0]);
      if (m <= goal) {
        if(m === goal) {
          return goal;
        }
        newData.push(m)
      }
    }

    return evaluate(newData, arr.slice(1), goal);
  }

  return 0
}


console.time('EXECUTION')
console.log(rows.map(r => evaluate([sum(r[1][0], r[1][1]), mult(r[1][0], r[1][1]), concat(r[1][0], r[1][1])], r[1].slice(2), r[0]) ? r[0] : 0).reduce((a, b) => a + b));
console.timeEnd('EXECUTION')