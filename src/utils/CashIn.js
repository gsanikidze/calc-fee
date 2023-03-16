import constants from '../constants';

export default class CashIn {
  static calculate(amount) {
    const fee = (constants.cashInPercent / 100) * amount;

    return fee > constants.cashInMaxFee ? constants.cashInMaxFee : fee;
  }
}
