import express, { Request, Response, Application } from "express";
import dotenv from 'dotenv';
import appRouter from "./config/routes";
import { db } from "./config/db";
import createESClient from "./config/Elastic/setup";
import createIndexes from "./config/Elastic/create-indexes";
import { importCitiesNames, importCitiesStations } from "./config/Elastic/map-data";


dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3001;

app.use(appRouter);

createESClient();

createIndexes();

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

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});