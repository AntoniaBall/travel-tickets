import express, { Request, Response, Application } from "express";
import dotenv from 'dotenv';
import appRouter from "./config/routes";
import { db } from "./config/db";
import setupESClient from "./config/Elastic/setup";
import createIndexes from "./config/Elastic/create-indexes";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3001;

app.use(appRouter);

db.getConnection(function(err,conn) {
    if (err) {
        throw new Error(`Cannot connect to the DB , ${err.message}`);
    } else {
        console.log(`DB Connexion status ${conn.state}`);
    }
});

// Setup ES
setupESClient();

// creating indexes
createIndexes();


app.get('/', (req: Request, res: Response) => {
    res.send('Express && TypeScript Server is running');
});

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});