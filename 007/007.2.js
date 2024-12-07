import {processLineByLine} from "../utils.js";

const rows = [];

await processLineByLine('data.txt', (line) => {
  rows.push(line.split(': ').map((v, i) => i > 0 ? v.split(' ').map(v => +v) : v).map((v, i) => i === 0 ? +v : v))
});

const sum = (a,b) => a+b;
const mult = (a,b) => a*b;
const concat = (a,b) => a*Math.pow(10, Math.floor(Math.log10(b)+1)) + b

const evaluate = (sums, arr) => arr.length > 0 ? evaluate([...sums.map(v => sum(v,arr[0])), ...sums.map(v => mult(v, arr[0])), ...sums.map(v => concat(v, arr[0]))], arr.slice(1)) : sums


console.time('EXECUTION')
console.log(rows.map(r => evaluate([sum(r[1][0], r[1][1]), mult(r[1][0], r[1][1]), concat(r[1][0], r[1][1])], r[1].slice(2)).includes(r[0]) ? r[0] : 0).reduce((a, b) => a + b));
console.timeEnd('EXECUTION')