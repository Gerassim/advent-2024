import {processLineByLine} from "../utils.js";

const pairs = [];
const reports = [];
await processLineByLine('pairs.txt', (line) => {
  pairs.push(line.split('|').map(v => +v))
});
await processLineByLine('reports.txt', (line) => {
  reports.push(line.split(',').map(v => +v))
});

const isReportCorrect = (report)=> {
  for (let i = 0; i < report.length - 1; i++) {
    for (let j = i+1; j < report.length; j++) {
      if(pairs.find(v => v[0] === report[i] && v[1] === report[j]) === undefined) {
        return false
      }
    }
  }

  return true;
}

let sum = 0;
for (const report of reports) {
  if(isReportCorrect(report)) {
    sum += report[Math.floor(report.length/2)]
  }
}

console.log(sum);