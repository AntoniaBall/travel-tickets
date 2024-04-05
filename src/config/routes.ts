import express from "express";
import { getCity, getCityDetails, searchCity } from "../controllers/CityController";

const appRouter = express.Router();

appRouter.get('/coucou', getCity);
appRouter.get('/city/search', searchCity);
appRouter.get('/city/:id/details', getCityDetails);

export default appRouter;