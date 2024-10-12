import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createServer } from "http";


// import initDatabase from './src/utils/connect-mongodb';
import configs from './src/config/config';
import router from './src/routers';
import initSocketServer from './src/sockets';

// initDatabase();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);
const httpServer = createServer(app);

initSocketServer(httpServer);

httpServer.listen(configs.PORT, () => {
    console.log("Server alive and running at port", configs.PORT);
});