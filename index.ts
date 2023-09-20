import express, { Request, Response, Application } from "express";
import dotenv from 'dotenv';
import appRouter from "./routes";


dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3001;

app.use(appRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Express && TypeScript Server is running');
});

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});