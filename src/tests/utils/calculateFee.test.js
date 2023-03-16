import calculateFee from '../../utils/calculateFee';

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
});
