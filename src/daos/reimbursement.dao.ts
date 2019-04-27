import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { convertSqlReimburse } from '../util/sql-reimbursement-converter';

export async function findReimbursementByStatus(statusId, start, end) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `SELECT * FROM arrest_dev.reimbursement
        WHERE status = $1 AND date_submitted BETWEEN $2 AND $3 ORDER BY date_submitted ASC`;
        const result = await client.query(queryString, [statusId, start, end]);
        const reimbursements = result.rows;
        if (reimbursements) {
            const convertedReimbur = reimbursements.map(convertSqlReimburse);
            return convertedReimbur;
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

export async function findReimbursementByUser(userId, start, end) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `SELECT * FROM arrest_dev.reimbursement
        WHERE author = $1 AND date_submitted BETWEEN $2 AND $3
        ORDER BY date_submitted ASC`;
        const result = await client.query(queryString, [userId, start, end]);
        const reimbursements = result.rows;
        if ( reimbursements ) {
            const convertedReimbur = reimbursements.map(convertSqlReimburse);
            return convertedReimbur;
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

export async function submitReimbursement( author, amount, dateSubmitted, dateResolved, description, resolver, status, type) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `INSERT INTO arrest_dev.reimbursement (author, amount, date_submitted, date_resolved, description, resolver, status, type)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
        const result = await client.query(queryString, [author, amount, dateSubmitted, dateResolved, description, resolver, status, type]);
        const reimbursements = result.rows;
        if ( reimbursements ) {
            const convertedReimbur = reimbursements.map(convertSqlReimburse);
            return convertedReimbur;
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

export async function updateReimbursement( reimbursementID, author, amount, dateSubmitted, dateResolved, description, resolver, status, type ) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `UPDATE arrest_dev.reimbursement
        SET author = $1, amount = $2, date_submitted = $3, date_resolved = $4, description = $5, resolver = $6, status = $7, type = $8
        WHERE reimbursement_id = $9`;
        await client.query(queryString, [author, amount, dateSubmitted, dateResolved, description, resolver, status, type, reimbursementID]);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
}

export async function findReimbursementByID (reimbursementID) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `SELECT * FROM arrest_dev.reimbursement
        WHERE reimbursement_id = $1`;
        const result = await client.query(queryString, [reimbursementID]);
        const reimburse = result.rows[0];
        if (reimburse) {
            const convertedReimbur = convertSqlReimburse(reimburse);
            return convertedReimbur;
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