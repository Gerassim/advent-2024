import {processLineByLine} from "../utils.js";

const lab = [];

let row = 0;
let startPos;

await processLineByLine('data.txt', (line) => {
  lab.push(line.split(''))
  if (line.indexOf('^') > 0) {
    startPos = [row, line.indexOf('^')]
    lab[row][line.indexOf('^')] = 'X';
  }
  row++;
});

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
]


const performMove = (move) => {
  const newPos = [move.p[0] + directions[move.d][0], move.p[1] + directions[move.d][1]]

  if (
    newPos[0] < 0 || newPos[0] > lab.length - 1 ||
    newPos[1] < 0 || newPos[1] > lab[0].length - 1
  ) {
    return false;
  }
  if (lab[newPos[0]][newPos[1]] === '#') {
    move.d = (move.d + 1) % directions.length
    return true;
  }
  move.p = newPos;
  lab[move.p[0]][move.p[1]] = 'X'
  return true;
}

let move = {d: 0, p: startPos}

while (performMove(move)) {}

console.log(lab.join().split('X').length - 1);