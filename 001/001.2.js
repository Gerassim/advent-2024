import {processLineByLine} from "../utils.js";

const a = [], b = [];
await processLineByLine('data.txt', (line) => {const l = line.split('   '); a.push(l[0]); b.push(l[1])});
const res = a.map((_,i) => a[i]*b.filter((v) => v === a[i]).length).reduce((acc, v) => acc + v)

console.log(res)