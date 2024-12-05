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
  for (let i = shift; i < report.length - 1; i++) {
    for (let j = i + 1; j < report.length; j++) {
      if (pairs.find(v => v[0] === report[i] && v[1] === report[j]) === undefined) {
        return [i, j]
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
      // slow as fuck
      // [report[res[0]], report[res[1]]] = [report[res[1]], report[res[0]]]
      const swp = res[0]; res[0]=res[1]; res[1]=swp;
      res = isReportCorrect(report, res[0])
    }
    sum += report[Math.floor(report.length / 2)]
  }
}
console.timeEnd('CALCULATION')
console.log(sum);