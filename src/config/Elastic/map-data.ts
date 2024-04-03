import mysql from 'mysql';
import { flatMap, get, map } from 'lodash/fp'
import createESClient from './setup';

const importCitiesNames = (db : mysql.Pool) => {
    db.getConnection(async (err, connection) => {
        try {
            const esClient = await createESClient();
            if (err) {
                throw new Error('Error while connection to db to make the query');
            }
            const query = `SELECT cn.pk_id,
            cn.city_name as "cityName",
            cn.pk_id as "cityNameId",
            JSON_OBJECT(
                'name', c.name,
                'pk_id', c.pk_id,
                'latitude', c.latitude ,
                'longitude', c.longitude 
            ) as "city"
            FROM CityName cn 
            INNER JOIN City c 
            ON cn.fk_city_id = c.pk_id;`;
    
            connection.query(query, async (err: any, results: any) => {
                if (err) {
                    throw new Error(`Error while querying the db, ${err}`);
                }
                const bulkData = map(result => {
                    const value = get('city', result);
                    return {
                        ...result,
                        city: JSON.parse(value)
                    }
                }, results);
                const operations = flatMap(doc => [{ index: { _index: 'citiesnames' } }, doc], bulkData);
                try {
                    const bulkResponse = await esClient.bulk({ refresh: true, operations });
                    if (bulkResponse.errors) {
                        bulkResponse.items.forEach(item => {
                          if (item.index && item.index.error) {
                            console.error('Error for operation:', item.index.error);
                          }
                        });
                      }
                } catch (error) {
                    throw new Error(`Error while proceeding the bullk import, ${error}`);
                }
            });

        } catch (error) {
            throw new Error(`Error while querying the db, ${error}`);
            
        }
        
    });
}

const importCitiesStations = (db: mysql.Pool) => {
    db.getConnection(async (err, connection) => {
        try {
            const esClient = await createESClient();
            if (err) {
                throw new Error('Error while connection to db to make the query');
            }
            const query = `SELECT cn.pk_id as "cityNameId",
            cn.city_name as "cityName",
            cn.fk_city_id as "fkCityId",
            CURDATE() as "createdTime",
            CURDATE() as "updatedTime" ,
            JSON_OBJECT(
            'stationId', s.pk_id,
            'name', s.name,
            'latitude', s.latitude,
            'longitude', s.longitude 
            ) as 'station'
            FROM CityName cn
            INNER JOIN Station s
            ON cn.fk_city_id = s.pk_id;`;
    
            connection.query(query, async (err: any, results: any) => {
                if (err) {
                    throw new Error(`Error while querying the db, ${err}`);
                }
                const bulkData = map(result => {
                    const value = get('station', result);
                    return {
                        ...result,
                        station: JSON.parse(value)
                    }
                }, results);
                const operations = flatMap(doc => [{ index: { _index: 'citiesstations' } }, doc], bulkData);
                try {
                    const bulkResponse = await esClient.bulk({ refresh: true, operations });
                    if (bulkResponse.errors) {
                        bulkResponse.items.forEach(item => {
                          if (item.index && item.index.error) {
                            console.error('Error for operation:', item.index.error);
                          }
                        });
                      }
                } catch (error) {
                    throw new Error(`Error while proceeding the bullk import, ${error}`);
                }
            });

        } catch (error) {
            throw new Error(`Error while querying the db, ${error}`);
        }
        
    });
};

export { importCitiesNames, importCitiesStations };