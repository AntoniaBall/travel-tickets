import dotenv from 'dotenv';

dotenv.config();

const mysqlParams = {
    host: process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
};

const serverConfigs = {
    port: process.env.PORT || 3001 
};

const defaultConfig = {
    mysql : mysqlParams,
    server: serverConfigs,
}

export default defaultConfig;