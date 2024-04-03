import express from "express";
import { getCity, searchCity } from "../controllers/CityController";

const appRouter = express.Router();

appRouter.get('/coucou', getCity);
appRouter.get('/city/search', searchCity);

export default appRouter;