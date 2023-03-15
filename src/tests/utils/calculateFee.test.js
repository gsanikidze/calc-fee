import calculateFee, { calculateCashIn } from '../../utils/calculateFee';
import constants from '../../constants';

describe('Should calculate fees', () => {
  it('Should throw type error', () => {
    expect(() => calculateFee()).toThrow(TypeError);
  });

  it('Should invalid currency error', () => {
    expect(() => calculateFee({ operation: { currency: 'invalid-currency' } })).toThrow(Error);
  });

  it('Should invalid type error', () => {
    expect(() => calculateFee({ type: 'invalid-type' })).toThrow(Error);
  });

  it('Should calculate cash in - when fee is less then max fee', () => {
    expect(calculateCashIn(200)).toBe(0.06);
  });

  it('Should calculate cash in - when fee is more then max fee', () => {
    const maxValue = constants.cashInMaxFee / (constants.cashInPercent / 100);

    expect(calculateCashIn(maxValue + 1)).toBe(5);
  });
});
