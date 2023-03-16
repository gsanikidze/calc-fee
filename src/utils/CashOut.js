import constants from '../constants';
import { isInSameWeek } from './helpers';

export default class CashOut {
  static prevTransInSameWeek({
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

  static juridical(amount) {
    const fee = (constants.cashOutJuridicalPercent / 100) * amount;

    return fee < constants.cashOutJuridicalMinFee ? constants.cashOutJuridicalMinFee : fee;
  }

  static calcNaturalFee(amount) {
    return (constants.cashOutNaturalPercent / 100) * amount;
  }

  static natural({
    id, user_id, transactions, date, amount,
  }) {
    const prevTransactionsTotal = CashOut.prevTransInSameWeek({
      id, user_id, transactions, date,
    }).reduce((acc, curr) => acc + curr.operation.amount, 0);

    if (prevTransactionsTotal >= constants.cashOutNaturalFreeOfChargeLimit) {
      return CashOut.calcNaturalFee(amount);
    }

    const limitLeft = constants.cashOutNaturalFreeOfChargeLimit - prevTransactionsTotal;
    const newAmount = amount - limitLeft;

    if (newAmount <= 0) {
      return 0;
    }

    return CashOut.calcNaturalFee(newAmount);
  }

  static calculate({
    id, user_id, transactions, user_type, amount, date,
  }) {
    if (user_type === 'natural') {
      return CashOut.natural({
        id, user_id, transactions, date, amount,
      });
    }

    if (user_type === 'juridical') {
      return CashOut.juridical(amount);
    }

    throw new Error('Invalid user type');
  }
}
