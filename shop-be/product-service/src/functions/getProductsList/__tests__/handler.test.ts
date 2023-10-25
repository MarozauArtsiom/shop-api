import { main } from '../handler';

describe('main', () => {
  it('should return the correct response', async () => {
    const result = await main();
    expect(result).toEqual({
      statusCode: 200,
    });
  });
});