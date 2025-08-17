import axios from 'axios';
import { mockGetUsers, mockUser } from '@gitkundo/backend/db/testing';

describe('GET /', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/api/`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Welcome to api!' });
  });
});

describe('GET /users', () => {
  it('should return users', async () => {
    const res = mockGetUsers();

    expect(res.status).toBe(200);
    expect(res.data).toEqual([mockUser]);
  });
});
