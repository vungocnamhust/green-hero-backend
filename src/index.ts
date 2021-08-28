import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import bodyParser from 'body-parser';
import errorHandler from './middlewares/errorHandler';
import authMiddleware from './middlewares/auth';
import asyncMiddleware from './middlewares/async';
import cors from 'cors';
const path = require('path');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/media",express.static('uploads'))

app.use(asyncMiddleware(authMiddleware));
/* routes */
routes(app).then(() => {
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`⚡️[]: Server is running at http://localhost:${PORT}`);
  });
});
