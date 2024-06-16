import 'dotenv/config';
import { fileURLToPath } from 'url';
import errorHandler from './middleware/ErrorHandingMiddleware.js'
import fileUpload from 'express-fileupload';
// import models from './models/models.js';
import router from './routers/index.js'
import sequelise from './db/db.js';
import express from 'express';
import path from 'path';
import cors from 'cors';

const PORT = process.env.PORT || 4000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(fileUpload({}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);
app.use(errorHandler);

const startApp = async () => {
    try {
        await sequelise.authenticate();
        await sequelise.sync();
        app.listen(PORT, () => console.log(`Started a server ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

startApp();