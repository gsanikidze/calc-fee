import constants from '../constants';

export function roundFee(amount) {
  return Number((Math.ceil(amount * 100) / 100).toFixed(2));
}

export function calculateCashIn(amount) {
  const fee = (constants.cashInPercent / 100) * amount;

  return fee > constants.cashInMaxFee ? constants.cashInMaxFee : roundFee(fee);
}

export function calculateCashOut() {
  return 0;
}

export default function calculateFee({
  date, user_id, user_type, type, operation,
}) {
  if (operation.currency !== constants.supportedCurrency) {
    throw new Error('Unsupported currency');
  }

  if (type === 'cash_in') {
    return calculateCashIn(operation.amount);
  }

  if (type === 'cash_out') {
    return calculateCashOut();
  }

  throw new Error('Invalid transaction type');
}
