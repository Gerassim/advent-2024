import {processLineByLine} from "../utils.js";

let data = [];
await processLineByLine('data.txt', (line) => {
  data.push(line)
});

const doRegexp = /do\(\)(.*?)don\'t\(\)/gm;
const regexp = 'mul\\((\\d{1,3}),(\\d{1,3})\\)';

// console.log(data.map(v=>[...v.matchAll(regexp)].map(v => v[1] * v[2]).reduce((a,v)=> a+v)).reduce((a,v) => a+v));
// console.log()
data = [data.join('')];
console.log(data.map(v => [...`do()${v}don\'t()`.matchAll(doRegexp)]).map(v => v.map(v1 => v1[1])).map(v => v.join('')).map(v=>[...v.matchAll(regexp)].map(v => v[1] * v[2]).reduce((a,v)=> a+v)).reduce((a,v) => a+v))