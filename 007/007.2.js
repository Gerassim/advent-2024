import {processLineByLine} from "../utils.js";

const rows = [];

await processLineByLine('data.txt', (line) => {
  rows.push(line.split(': ').map((v, i) => i > 0 ? v.split(' ').map(v => +v) : v).map((v, i) => i === 0 ? +v : v))
});

const sum = (a, b) => a + b;
const mult = (a, b) => a * b;
const concat = (a, b) => a * Math.pow(10, Math.floor(Math.log10(b) + 1)) + b

const evaluate = (sums, arr, goal) => {
  if (arr.length > 0 && sums.length > 0 && !sums.includes(goal)) {
    const newData = [];
    for (let i = 0; i < sums.length; i++) {
      if(sum(sums[i], arr[0]) <= goal) {
        newData.push(sum(sums[i], arr[0]))
      }
      if(mult(sums[i], arr[0]) <= goal) {
        newData.push(mult(sums[i], arr[0]))
      }
      if(concat(sums[i], arr[0]) <= goal) {
        newData.push(concat(sums[i], arr[0]))
      }
    }
    return evaluate(newData, arr.slice(1), goal);
  } else {
    return sums.includes(goal) ? goal : 0;
  }
}


console.time('EXECUTION')
console.log(rows.map(r => evaluate([sum(r[1][0], r[1][1]), mult(r[1][0], r[1][1]), concat(r[1][0], r[1][1])], r[1].slice(2), r[0]) ? r[0] : 0).reduce((a, b) => a + b));
console.timeEnd('EXECUTION')