import createESClient from "../config/Elastic/setup";

const getSingleCityDetails = async (cityId: string) => {
    const esClient = await createESClient();
    return await esClient.get({
        index: 'citiesstations',
        id: cityId
    })
};

export { getSingleCityDetails }