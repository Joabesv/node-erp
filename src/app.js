import express from 'express';
import cors from 'cors';

import connection from './database/database.js';
import routerService from './routes/router.service.js';
import ApiResponse from './helpers/apiResponses.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const apiResponse = ApiResponse();

// MongoDB connection
connection();

//To allow cross-origin requests
app.use(cors());

routerService(app);

app.all('*', (req, res) => {
  return apiResponse.notFoundResponse(res, 'Page not found');
});

export default app;
