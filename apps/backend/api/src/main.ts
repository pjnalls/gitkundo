/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import { getUsers, db } from '@gitkundo/db';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (_, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.get('/api/users', async (_, res) => {
  try {
    const users = await getUsers(db);
    res.send({ data: users });
  } catch (error) {
    console.error(error);
  }
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
