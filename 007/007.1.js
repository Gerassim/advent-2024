import {processLineByLine} from "../utils.js";

const rows = [];
await processLineByLine('data.txt', (line) => {
  rows.push(line.split(': ').map((v, i) => i > 0 ? v.split(' ').map(v => +v) : v).map((v, i) => i === 0 ? +v : v))
});

const evaluate = (sums, arr) => arr.length > 0 ? evaluate([...sums.map(v => v + arr[0]), ...sums.map(v => v * arr[0])], arr.slice(1)) : sums

console.time('EXECUTION')
console.log(rows.map(r => evaluate([r[1][0]+r[1][1], r[1][0]*r[1][1]], r[1].slice(2)).includes(r[0]) ? r[0] : 0).reduce((a,b) => a+b));
console.timeEnd('EXECUTION')