import fs from 'fs/promises';
// import { stdin, stdout } from 'node:process';
// import readline from 'readline';

const filepath = process.argv[2];

if (!filepath) {
  throw Error('File path is required');
}

fs.readFile(filepath).then((res) => {
  const parsed = JSON.parse(res);
  console.log(parsed);
}).catch((error) => {
  console.error(error);
});
