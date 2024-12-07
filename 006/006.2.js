import {processLineByLine} from "../utils.js";

const initialLab = [];

let row = 0;
let startPos;

await processLineByLine('data.txt', (line) => {
  initialLab.push(line.split(''))
  if (line.indexOf('^') > 0) {
    startPos = [row, line.indexOf('^')]
    initialLab[row][line.indexOf('^')] = '.';
  }
  row++;
});

const directions = [
  [-1, 0, '^'],
  [0, 1, '>'],
  [1, 0, 'v'],
  [0, -1, '<'],
]

let counter = 0;
for (let i = 0; i < initialLab.length; i++) {
  for (let j = 0; j < initialLab[0].length; j++) {
    let move = {d: 0, p: startPos.slice(), lab: initialLab.map(l => l.slice())};
    if (startPos[0] !== i || startPos[1] !== j) {
      move.lab[i][j] = '#';
    }

    while (true) {
      const newPos = [move.p[0] + directions[move.d][0], move.p[1] + directions[move.d][1]]
      // if out of bounds end
      if (
        newPos[0] < 0 || newPos[0] > move.lab.length - 1 ||
        newPos[1] < 0 || newPos[1] > move.lab[0].length - 1
      ) {
        break;
      }

      // if obstruction rotate, else move
      if (move.lab[newPos[0]][newPos[1]] === '#') {
        move.d = (move.d + 1) % directions.length
        // if already been here and made same rotation we are in a loop
        if (move.lab[move.p[0]][move.p[1]] === directions[move.d][2]) {
          counter++;
          break;
        }
        // if never rotate here mark with direction
        if(move.lab[move.p[0]][move.p[1]] === '.') {
          move.lab[move.p[0]][move.p[1]] = directions[move.d][2];
        }
      } else {
        move.p = [move.p[0] + directions[move.d][0], move.p[1] + directions[move.d][1]];
      }
    }
  }
}

console.log(counter);