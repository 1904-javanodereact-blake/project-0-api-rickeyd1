export class Reimbursement {
    reimbursementID: number;    // primary key
    author: number;             // foreign key -> User, not null
    amount: number;         // not null
    dateSubmitted: number;  // not null
    dateResolved: number;
    description: string;    // not null
    resolver: number;       // foreign key -> User
    status: number;         // foreign key -> ReimbursementStatus, not null
    type: number;           // foreign key -> ReimbursementType

    constructor(reimbursementID = 0, author = 0, amount = 0, dateSubmitted = 0, dateResolved = 0,
        description = '', resolver = 0, status = 0, type = 0) {
            this.reimbursementID = reimbursementID;
            this.author = author;
            this.amount = amount;
            this.dateSubmitted = dateSubmitted;
            this.dateResolved = dateResolved;
            this.description = description;
            this.resolver = resolver;
            this.status = status;
            this.type = type;
        }
}