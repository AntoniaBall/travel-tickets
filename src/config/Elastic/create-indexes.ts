import { Client } from '@elastic/elasticsearch';

const client = new Client({
    node: process.env.ELASTIC_LOCAL_PORT,
    maxRetries: 2,
});

const citiesNamesMappingBody = {
    index: 'citiesnames',
    body: {
        mappings: {
            properties: {
                cityName: { type: 'text'},
                language: { type: 'text'},
                city: {
                    properties: {
                        name: { type: 'text' },
                        pk_id: { type: 'integer' },
                        latitude: { type: 'float' },
                        longitude: { type: 'float' },
                    }
                },
                createdTime: { type: 'date'},
                updatedTime: { type: 'date' }
            }
        }
    },
}

const citiesStationsMappingBody = {
    index: 'citiesstations',
    body: {
        mappings: {
            properties: {
                cityName: { type: 'text'},
                fkCityId: { type: 'integer'},
                stations: {
                    properties: {
                        stationId: { type : 'integer'},
                        name: { type: 'text' },
                        latitude: { type: 'float' },
                        longitude: { type: 'float' },
                    }
                },
                createdTime: { type: 'date' },
                updatedTime: { type: 'date' }
            }
        }
    },
}

const createIndexes = async (): Promise<void> => {
    try {
        if (!await client.indices.exists({ index: 'citiesnames' })) {
            console.log(`Creating index citiesnames with mapping`);
            await client.indices.create(citiesNamesMappingBody);
        }
        if (!await client.indices.exists({ index: 'citiesstations' })) {
            console.log(`Creating index citiesstations with mapping`);
            await client.indices.create(citiesStationsMappingBody);
        }
    } catch (error) {
        throw new Error(`Creating new indexes, ${error}`);
    }

};

export default createIndexes;