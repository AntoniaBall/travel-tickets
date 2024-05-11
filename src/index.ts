import express, { Request, Response, Application } from "express";
// import dotenv from 'dotenv';
import appRouter from "./config/routes";
import { db } from "./config/db";
import createESClient from "./infra/setup-es";
import createIndexes from "./config/Elastic/create-indexes";
import { importCitiesNames, importCitiesStations } from "./config/Elastic/map-data";
import defaultConfig  from '../src/config/config';

const app: Application = express();

app.use(appRouter);

createESClient();

createIndexes();

console.log('use approuteer');
db.getConnection(function(err,conn) {
    if (err) {
        throw new Error(`Cannot connect to the DB , ${err.message}`);
    } else {
        console.log(`DB Connexion status ${conn.state}`);
        console.log(`Indexing ES Documents`);
        importCitiesNames(db);
        importCitiesStations(db);
    }
});

app.get('/', (req: Request, res: Response) => {
    res.send('Express && TypeScript Server is running');
});

app.listen(defaultConfig.server.port, () => {
    console.log(`Server running at ${defaultConfig.server.port}`);
});