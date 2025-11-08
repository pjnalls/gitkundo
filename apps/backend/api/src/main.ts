/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import cors from 'cors';
import express, { Request, Response } from 'express';
import * as path from 'path';
import { getUsers, db, createUser, users } from '@gitkundo/db';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(
  cors({
    origin: [
      'http://localhost:8081',
      'http://127.0.0.1:8081',
      'http://10.0.0.13:8081',
    ],
  })
);
app.use(express.json());

app.get('/api', (_, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.get(
  '/api/users',
  async (_, res: Response<{ data: Array<typeof users.$inferSelect> }>) => {
    try {
      const userData: Array<typeof users.$inferSelect> = await getUsers(db);
      res.send({ data: userData });
    } catch (error) {
      console.error(error);
    }
  }
);

app.post(
  '/api/user',
  async (
    req: Request<{ body: typeof users.$inferInsert }>,
    res: Response<{ message: string }>
  ) => {
    try {
      console.log('Received user data from frontend:\n', req.body);
      const user = await createUser(db, req.body);
      res.send({ message: 'User created successfully!' });
      console.log('User created and sent back to frontend:\n', user);
    } catch (error) {
      console.error(error);
    }
  }
);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
