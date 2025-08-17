import { users } from '../models/schema.js';

export const mockDB = jest.fn(() => 'db');

export const mockGetUsers = jest.fn(() => ({
  status: 200,
  data: [mockUser],
}));

export const mockUser: typeof users.$inferSelect = {
  id: '0',
  username: 'bobsmith',
  email: 'bobsmith.fake@gmail.com',
  bio: "I'm a duck.",
  passwordHash: 'aaaa',
  profilePictureUrl: 'https://picsum.photos/200/300',
  createdAt: new Date().toLocaleString(),
  updatedAt: new Date().toLocaleString(),
};
