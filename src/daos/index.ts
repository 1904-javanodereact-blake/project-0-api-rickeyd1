import { Pool } from 'pg';

export const connectionPool = new Pool({
    user: process.env['SHIP_DB_USERNAME'],
    host: process.env['SHIP_DB_URL'],
    database: process.env['P0_DB_NAME'] || 'postgres',
    password: process.env['SHIP_DB_PASSWORD'],
    port: 5432,
    max: 5
});