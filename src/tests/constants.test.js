import { setup } from '../constants';

describe('Constant tests', () => {
  it('Should load variables', async () => {
    const constants = await setup();

    await expect(Object.keys(constants)).not.toBe(0);
  });
});
