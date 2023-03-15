import path from 'path';
import parseJson from '../../utils/parseJson';

describe('Should parse json file', () => {
  it('Should throw an Error', async () => {
    await expect(() => parseJson())
      .rejects
      .toThrow(Error);
  });

  it('Should throw invalid path error', async () => {
    await expect(parseJson('./invalid.json'))
      .rejects
      .toThrow("ENOENT: no such file or directory, open './invalid.json'");
  });

  it('Should return parsed json', async () => {
    const filepath = path.join(process.cwd(), 'input.json');
    const res = await parseJson(filepath);

    expect(res).not.toHaveLength(0);
  });
});
