import express from 'express';
import cors from 'cors';

import connection from './database/database.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
connection();

//To allow cross-origin requests
app.use(cors());

export default app;
