import { mockDB, mockGetUsers, mockUser } from './__mocks__/db.spec';

describe('db', () => {
  it('should work', () => {
    expect(mockDB()).toBe('db');
  });
});

describe('getUsers', () => {
  it('should return users', () => {
    const res = mockGetUsers();

    expect(res.status).toBe(200);
    expect(res.data).toEqual([mockUser]);
  });
});
