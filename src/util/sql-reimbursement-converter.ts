import { SqlReimburse } from '../dto/sql-reimbursement.dto';
import { Reimbursement } from '../model/reimbursement';

export function convertSqlReimburse(reimburse: SqlReimburse) {
    return new Reimbursement(reimburse.reimbursement_id, reimburse.author, reimburse.amount,
        reimburse.date_submitted, reimburse.date_resolved, reimburse.description, reimburse.resolver,
        reimburse.status, reimburse.type);
}