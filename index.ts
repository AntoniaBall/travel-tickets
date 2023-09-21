    import express, { Request, Response, Application } from "express";
import dotenv from 'dotenv';
import appRouter from "./routes";
import { db } from "./config/db";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3001;

app.use(appRouter);

db.getConnection(function(err,conn) {
    if (err) {
        console.log('err');
        console.log(err.message);
    } else {
        console.log('conn');
        console.log(conn);
    }
});
app.get('/', (req: Request, res: Response) => {
    res.send('Express && TypeScript Server is running');
});

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});