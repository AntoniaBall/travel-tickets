import { Request, Response } from "express";
import createESClient from "../infra/setup-es";
import { get, getOr } from "lodash/fp";
import { getSingleCityDetails } from "../ports/get-city-details";


const getCity = (req: Request, res: Response) => {
    return res.status(200).json({data: "getCity setup function"});
};

const searchCity = async (req: Request, res: Response) => {
    try {
        const queryString = get('query.q', req);
        const querySize = get('query.size', req);
        const queryLanguage = getOr('', 'query.lang', req);
        const esClient = await createESClient();
        const result = await esClient.search({
            index: 'citiesnames',
            size: querySize,
            query: {
                bool: {
                    must: [
                        { match: {'city.name' : queryString }},
                        { match: {'language' : queryLanguage }},
                    ]
                }
            },
            collapse: {
                field: 'pk_id'
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