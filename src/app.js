import parseJson from './utils/parseJson';
import calculateFee from './utils/calculateFee';

async function app() {
  const filepath = process.argv[2];
  const transactions = await parseJson(filepath);

  transactions.forEach((transaction) => {
    console.log('*******************');
    console.log(transaction);
    console.log(calculateFee(transaction));
    console.log('*******************');
  });
}

app();
