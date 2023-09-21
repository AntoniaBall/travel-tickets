// connect to the database

import mysql from 'mysql';
import config from './config';


const params = {
    user: config.mysql.user,
    password: config.mysql.password,
    host: config.mysql.host,
    database: config.mysql.database
};

export const db = mysql.createPool(params);
