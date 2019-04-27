export class ReimbursementType {
    typeId: number;     // primary key
    type: string;       // not null, unique

    constructor(typeID = 0, type = '') {
        this.typeId = typeID;
        this.type = type;
    }
}