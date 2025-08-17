import { mockDB } from './__mocks__/db.spec.js';

describe('db', () => {
  it('should work', () => {
    expect(mockDB()).toBe('db');
  });
});
