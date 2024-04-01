import { Client } from '@elastic/elasticsearch';

const createESClient = async (): Promise<Client> => {
    try {
        const esClient = new Client({
            node: process.env.ELASTIC_LOCAL_PORT,
            maxRetries: 2,
        });
        const apiResponse = await esClient.ping();
        if (apiResponse) {
            console.log('ES Client successfully setup');
        } else {
            throw new Error(`error while setup ES Client`);
        }
        return esClient;
    } catch (error) {
        throw new Error(`Error while setup ES Client : ${error}`);
    }
}

export default createESClient;