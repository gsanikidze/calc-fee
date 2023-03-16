import parseJson from './utils/parseJson';
import calculateFee from './utils/calculateFee';
import { roundFee } from './utils/helpers';
import { setup } from './constants';

async function app() {
  const filepath = process.argv[2];
  const transactions = await parseJson(filepath)
    .then((res) => res.map((transaction, index) => ({ ...transaction, id: index })));

  await setup();

  transactions.forEach((transaction) => {
    const fee = roundFee(calculateFee(transaction, transactions));

    console.log(fee);
  });
}

app();
