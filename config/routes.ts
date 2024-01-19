import express from "express";
import { getCity } from "../controllers/CityController";

const appRouter = express.Router();

appRouter.get('/coucou', getCity);

export default appRouter;