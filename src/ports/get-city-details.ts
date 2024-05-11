import createESClient from "../infra/setup-es";

const getSingleCityDetails = async (cityId: string) => {
    const esClient = await createESClient();
    return await esClient.get({
        index: 'citiesstations',
        id: cityId
    })
};

export { getSingleCityDetails }