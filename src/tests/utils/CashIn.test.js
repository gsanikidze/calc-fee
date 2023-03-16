import CashIn from '../../utils/CashIn';
import constants from '../../constants';

describe('Should test cash in functionality', () => {
  it('Should calculate cash in - when fee is less then max fee', () => {
    expect(CashIn.calculate(200)).toBe(0.06);
  });

  it('Should calculate cash in - when fee is more then max fee', () => {
    const maxValue = constants.cashInMaxFee / (constants.cashInPercent / 100);

    expect(CashIn.calculate(maxValue + 1)).toBe(5);
  });
});
