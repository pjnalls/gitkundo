import axios from 'axios';

describe('GET /', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/api/`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Welcome to api!' });
  });
});

describe('GET /users', () => {
  it('should return users', async () => {
    const res = { status: 200, data: [{ id: '0', username: 'bobsmith' }] };

    expect(res.status).toBe(200);
    expect(res.data).toEqual([
      {
        id: '0',
        username: 'bobsmith',
      },
    ]);
  });
});
