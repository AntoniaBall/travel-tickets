// setup es client
import { Client } from '@elastic/elasticsearch';

async function setupESClient() {
    try {
        console.log('coucou');
        
        const esClient = new Client({
            node: process.env.ELASTIC_LOCAL_PORT,
            maxRetries: 2,
        });
        const apiResponse = await esClient.ping();
        if (apiResponse){
            console.log('ES Client successfully setup');
        } else {
            throw new Error(`error while setup ES Client`);
        }
    } catch (error) {
        throw new Error(`error while setup ES Client ${error}`);
    }


}

export default setupESClient;