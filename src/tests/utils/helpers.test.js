import { roundFee, getWeekNumber, isInSameWeek } from '../../utils/helpers';

describe('Should test helper functions', () => {
  it('Should round the fee', () => {
    expect(roundFee(0.032)).toBe(0.04);
  });

  it('Should return week number', () => {
    expect(getWeekNumber(new Date('2016-01-05'))).toBe(1);
  });

  it('Week numbers should be same', () => {
    expect(isInSameWeek(new Date('2016-01-05'), new Date('2016-01-10'))).toBeTruthy();
  });
});
