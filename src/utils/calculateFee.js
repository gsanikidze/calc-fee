import constants from '../constants';
import { isInSameWeek } from './helpers';

export function prevCashOutsInSameWeek({
  id, date, user_id, transactions,
}) {
  const otherTransactions = transactions
    .filter((transaction) => transaction.id < id
     && transaction.user_id === user_id
     && transaction.type === 'cash_out');
  const otherTransactionsInSameWeek = otherTransactions
    .filter((tr) => isInSameWeek(tr.date, date));

  return otherTransactionsInSameWeek;
}

export function calculateCashIn(amount) {
  const fee = (constants.cashInPercent / 100) * amount;

  return fee > constants.cashInMaxFee ? constants.cashInMaxFee : fee;
}

export function cashOutJuridical(amount) {
  const fee = (constants.cashOutJuridicalPercent / 100) * amount;

  return fee < constants.cashOutJuridicalMinFee ? constants.cashOutJuridicalMinFee : fee;
}

export function cashOutNaturalFee(amount) {
  return (constants.cashOutNaturalPercent / 100) * amount;
}

export function cashOutNatural({
  id, user_id, transactions, date, amount,
}) {
  const prevTransactionsTotal = prevCashOutsInSameWeek({
    id, user_id, transactions, date,
  }).reduce((acc, curr) => acc + curr.operation.amount, 0);

  if (prevTransactionsTotal >= constants.cashOutNaturalFreeOfChargeLimit) {
    return cashOutNaturalFee(amount);
  }

  const limitLeft = constants.cashOutNaturalFreeOfChargeLimit - prevTransactionsTotal;
  const newAmount = amount - limitLeft;

  if (newAmount <= 0) {
    return 0;
  }

  return cashOutNaturalFee(newAmount);
}

export function calculateCashOut({
  id, user_id, transactions, user_type, amount, date,
}) {
  if (user_type === 'natural') {
    return cashOutNatural({
      id, user_id, transactions, date, amount,
    });
  }

  if (user_type === 'juridical') {
    return cashOutJuridical(amount);
  }

  throw new Error('Invalid user type');
}

export default function calculateFee({
  id, date, user_id, user_type, type, operation,
}, transactions) {
  if (operation.currency !== constants.supportedCurrency) {
    throw new Error('Unsupported currency');
  }

  if (type === 'cash_in') {
    return calculateCashIn(operation.amount);
  }

  if (type === 'cash_out') {
    return calculateCashOut({
      id,
      user_id,
      user_type,
      amount: operation.amount,
      transactions,
      date,
    });
  }

  throw new Error('Invalid transaction type');
}
