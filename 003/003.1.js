import {processLineByLine} from "../utils.js";

const data = [];
await processLineByLine('data.txt', (line) => {
  data.push(line)
});

const multRegexp = 'mul\\((\\d{1,3}),(\\d{1,3})\\)';

console.log(data.map(v=>[...`do()${v}don't()`.matchAll(multRegexp)].map(v => v[1] * v[2]).reduce((a,v)=> a+v)).reduce((a,v) => a+v));