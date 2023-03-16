import constants from '../constants';
import CashIn from './CashIn';
import CashOut from './CashOut';

export default function calculateFee({
  id, date, user_id, user_type, type, operation,
}, transactions) {
  if (operation.currency !== constants.supportedCurrency) {
    throw new Error('Unsupported currency');
  }

  if (type === 'cash_in') {
    return CashIn.calculate(operation.amount);
  }

  if (type === 'cash_out') {
    const data = {
      id,
      user_id,
      user_type,
      amount: operation.amount,
      transactions,
      date,
    };

    return CashOut.calculate(data);
  }

  throw new Error('Invalid transaction type');
}
