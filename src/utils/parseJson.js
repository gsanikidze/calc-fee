import fs from 'fs/promises';

// reads and returns parsed json file
export default async function parseJson(filepath) {
  if (!filepath) {
    throw new Error('File path is required');
  }

  const res = await fs.readFile(filepath);
  const parsed = JSON.parse(res);

  return parsed;
}
