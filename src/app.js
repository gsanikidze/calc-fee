import parseJson from './utils/parseJson';

async function app() {
  const filepath = process.argv[2];
  const parsedJson = await parseJson(filepath);
  console.log(parsedJson);
}

app();
