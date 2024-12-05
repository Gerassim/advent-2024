import {processLineByLine} from "../utils.js";

const pairs = [];
const reports = [];
const data = '';

await processLineByLine(`${data}pairs.txt`, (line) => {
  pairs.push(line.split('|').map(v => +v))
});
await processLineByLine(`${data}reports.txt`, (line) => {
  reports.push(line.split(',').map(v => +v))
});

const isReportCorrect = (report, shift = 0) => {
  for (let i = 0; i < report.length - 1; i++) {
    for (let j = i + 1; j < report.length; j++) {
      if (pairs.find(v => v[0] === report[i] && v[1] === report[j]) === undefined) {
        return [i + shift, j + shift]
      }
    }
  }

  return true;
}
console.time('CALCULATION')
let sum = 0;
for (const report of reports) {
  let res = isReportCorrect(report);
  if (res !== true) {
    while (res !== true && res[0] <= Math.floor(report.length / 2)) {
      [report[res[0]], report[res[1]]] = [report[res[1]], report[res[0]]]
      res = isReportCorrect(report.slice(res[0]), res[0])
    }
    sum += report[Math.floor(report.length / 2)]
  }
}
console.timeEnd('CALCULATION')
console.log(sum);