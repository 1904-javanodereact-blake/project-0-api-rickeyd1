import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { convertSqlUser } from '../util/sql-user-converter';
import { converSqlRole } from '../util/sql-role-converter';

export async function findAllUsers() {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query(`SELECT * FROM arrest_dev.users as u
        INNER JOIN arrest_dev.role as r ON (u.role = r.role_id) ORDER BY u.user_id ASC`);
        const user = result.rows;
        if (user) {
            const convertedUser = user.map(convertSqlUser);
            for (let i = 0; i < user.length; i++) {
                convertedUser[i].role = converSqlRole(user[i]);
            }
            return convertedUser;
        } else {
            return undefined;
        }
    } catch (err) {
        console.log(err);
        return undefined;
    } finally {
        client && client.release();
    }
}

export async function findUsernameAndPassword(username: string, password: string) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `SELECT * FROM arrest_dev.users as u
        INNER JOIN arrest_dev.role as r ON (u.role = r.role_id)
        WHERE username = $1 AND password = $2`;
        const result = await client.query(queryString, [username, password]);
        const user = result.rows[0];
        if (user) {
            const convertedUser = convertSqlUser(user);
            convertedUser.role = converSqlRole(user);
            return convertedUser;
        } else {
            return undefined;
        }
    } catch (err) {
        console.log(err);
        return undefined;
    } finally {
        client && client.release();
    }
}

export async function findUserByID(userID: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `SELECT * FROM arrest_dev.users as u
        INNER JOIN arrest_dev.role as r ON (u.role = r.role_id)
        WHERE user_id = $1`;
        const result = await client.query(queryString, [userID]);
        const user = result.rows[0];
        if (user) {
            const convertedUser = convertSqlUser(user);
            convertedUser.role = converSqlRole(user);
            return convertedUser;
        } else {
            return undefined;
        }
    } catch (err) {
        console.log(err);
        return undefined;
    } finally {
        client && client.release();
    }
}

export async function updateUser(userId, username, password, firstName, lastName, email, role) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `UPDATE arrest_dev.users
        SET username = $1, password = $2, first_name = $3, last_name = $4, email = $5, role = $6
        WHERE user_id = $7`;
        const result = await client.query(queryString, [username, password, firstName, lastName, email, role, userId]);
        const user = result.rows[0];
        if (user) {
            const convertedUser = convertSqlUser(user);
            convertedUser.role = converSqlRole(user);
        } else {
            return undefined;
        }
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
}