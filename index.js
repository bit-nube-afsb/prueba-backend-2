import express from 'express';
import databaseConnection from './db/config.js';
import dotenv from 'dotenv';
import api from './routes/api.routes.js'
import cors from 'cors';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

databaseConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', api)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el http://localhost:${PORT}`);
});
