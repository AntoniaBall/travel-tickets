import { Request, Response } from "express";
import createESClient from "../config/Elastic/setup";
import { get } from "lodash/fp";
import { getSingleCityDetails } from "../services/get-city-details";


const getCity = (req: Request, res: Response) => {
    return res.status(200).json({data: "getCity setup function"});
};

const searchCity = async (req: Request, res: Response) => {
    try {
        const queryString = get('query.q', req);
        console.log("🚀 ~ searchCity ~ value:", queryString);
        const esClient = await createESClient();
        const result = await esClient.search({
            index: 'citiesnames',
            size: 10,
            query: {
                match: {
                    'cityName' : queryString
                }
            }
        });
        return res.status(200).json({ data: result.hits.hits });
    } catch (error) {
        throw new Error(`Cannot get the single City details ${error}`);
    }
};

const getCityDetails = async(req: Request, res: Response) => {
    try {
        const cityId = get('params.id', req);
        console.log(req.query);
        const result = await getSingleCityDetails(cityId);
        return res.status(200).json({data: result});
    } catch (error) {
        throw new Error(`Cannot get the city detail, ${error}`);
    }
};

export { getCity, searchCity, getCityDetails}