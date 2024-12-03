import {createReadStream} from 'fs';
import {createInterface} from 'readline';
export const processLineByLine = async (file, callback) => {
  const fileStream = createReadStream(file);

  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    callback(line);
  }
}