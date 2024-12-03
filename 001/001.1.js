import {processLineByLine} from "../utils.js";

let a = [], b= [];
await processLineByLine('001.txt', (line) => {const l = line.split('   '); a.push(l[0]); b.push(l[1])});
b = b.sort((a,b) => a - b)
const res = a.sort((a,b) => a - b).map((v, i) => Math.abs(v-b[i])).reduce((acc, v) => acc+v);

console.log(res)