import { config } from '@config/index';
import { authRouter } from '@modules/auth/infra/http/routes/authRoutes';
import { boardRouter } from '@modules/boards/infra/http/routes/boardRoutes';
import { cardRouter } from '@modules/cards/infra/http/routes/cardRoutes';
import { listRouter } from '@modules/lists/infra/http/routes/listRoutes';
import { userRouter } from '@modules/users/infra/http/routes/userRoutes';
import { connectToDatabase } from '@shared/infra/database/mongoose';
import cors from 'cors';
import express from 'express';

const startServer = async () => {
  const app = express();

  app.use(
    cors({
      origin: config.allowedOrigins,
      credentials: true,
    }),
  );

  app.use(express.json());

  await connectToDatabase();

  app.use('/users', userRouter);
  app.use('/auth', authRouter);
  app.use('/boards', boardRouter);
  app.use('/lists', listRouter);
  app.use('/cards', cardRouter);

  app.get('/', (req, res) => {
    res.send('Trello Clone API is running');
  });

  app.listen(config.port, () => {
    console.log(`Server listening on port: ${config.port}`);
  });
};

startServer();
