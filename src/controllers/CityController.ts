import { Request, Response } from "express";
import createESClient from "../config/Elastic/setup";
import { get } from "lodash/fp";

const getCity = (req: Request, res: Response) => {
    return res.status(200).json({data: "getCity setup function"});
};


const searchCity = async (req: Request, res: Response) => {
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
};

export { getCity, searchCity }