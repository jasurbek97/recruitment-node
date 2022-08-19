import { encrypt, isMatch } from './index';

describe('Utils functions', () => {
  it('should return bad request exception', async () => {
    const encrypted = await encrypt('password');
    expect(typeof encrypted).toBe('string');
  });

  it('should return bad request exception', async () => {
    expect(await isMatch('password', await encrypt('password'))).toBe(true);
  });
});
