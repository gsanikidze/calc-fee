import calculateFee, {
  calculateCashIn, cashOutJuridical, cashOutNatural, prevCashOutsInSameWeek,
} from '../../utils/calculateFee';
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

  it('Should calculate cash out juridical - when fee is more then min', () => {
    expect(cashOutJuridical(10000)).toBe(30);
  });

  it('Should calculate cash out juridical - when fee is less then min', () => {
    expect(cashOutJuridical(constants.cashOutJuridicalMinFee)).toBe(0.5);
  });

  it('Should calculate cash out natural', () => {
    expect(cashOutNatural(100)).toBe(0.3);
  });

  it('Should return prev cash outs by this user in same week', () => {
    const currTransaction = {
      id: 5,
      user_id: 1,
      type: 'cash_out',
      date: '2016-01-10',
    };

    const otherTransactions = [
      {
        id: 0,
        user_id: 1,
        type: 'cash_out',
        date: '2016-01-04',
      },
      {
        id: 1,
        user_id: 1,
        type: 'cash_out',
        date: '2016-01-05',
      },
      {
        id: 2,
        user_id: 2,
        type: 'cash_out',
        date: '2016-01-11',
      },
      {
        id: 3,
        user_id: 1,
        type: 'cash_in',
        date: '2016-01-11',
      },
      {
        id: 7,
        user_id: 1,
        type: 'cash_out',
        date: '2016-01-15',
      },
    ];

    expect(
      prevCashOutsInSameWeek({
        ...currTransaction,
        transactions: otherTransactions,
      }),
    ).toHaveLength(2);
  });
});
