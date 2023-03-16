import CashOut from '../../utils/CashOut';
import constants from '../../constants';

describe('Should test cash out functionality', () => {
  it('Should calculate cash out juridical - when fee is more then min', () => {
    expect(CashOut.calcJuridicalFee(10000)).toBe(30);
  });

  it('Should calculate cash out juridical - when fee is less then min', () => {
    expect(CashOut.calcJuridicalFee(constants.cashOutJuridicalMinFee)).toBe(0.5);
  });

  it('Should calculate cash out natural', () => {
    expect(CashOut.calcNaturalFee(100)).toBe(0.3);
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
      CashOut.prevTransInSameWeek({
        ...currTransaction,
        transactions: otherTransactions,
      }),
    ).toHaveLength(2);
  });

  it('Should throw error - invalid user type', () => {
    expect(() => CashOut.calculate({ user_type: 'invalid-user' })).toThrow(Error);
  });

  it('Should calculate cash out natural fee - when transaction is out of limit', () => {
    const data = {
      transactions: [],
      id: 1,
      user_id: 1,
      amount: constants.cashOutNaturalFreeOfChargeLimit + 100,
    };

    expect(CashOut.natural(data)).toBe(0.3);
  });

  it('Should calculate cash out natural fee - when transaction is in of limit', () => {
    const data = {
      transactions: [],
      id: 1,
      user_id: 1,
      amount: constants.cashOutNaturalFreeOfChargeLimit,
    };

    expect(CashOut.natural(data)).toBe(0.0);
  });

  it('Should calculate cash out natural fee - other transactions and current are in limit', () => {
    const data = {
      transactions: [{
        id: 0,
        user_id: 1,
        operation: {
          amount: constants.cashOutNaturalFreeOfChargeLimit / 2,
        },
        date: '2016-01-04',
        type: 'cash_out',
      }],
      id: 1,
      user_id: 1,
      amount: constants.cashOutNaturalFreeOfChargeLimit / 2,
      date: '2016-01-10',
    };

    expect(CashOut.natural(data)).toBe(0);
  });

  it('Should calculate cash out natural fee - other transactions and current are out of limit', () => {
    const data = {
      transactions: [{
        id: 0,
        user_id: 1,
        operation: {
          amount: constants.cashOutNaturalFreeOfChargeLimit,
        },
        date: '2016-01-04',
        type: 'cash_out',
      }],
      id: 1,
      user_id: 1,
      amount: constants.cashOutNaturalFreeOfChargeLimit,
      date: '2016-01-10',
      type: 'cash_out',
    };

    expect(CashOut.natural(data)).toBe(3);
  });
});
