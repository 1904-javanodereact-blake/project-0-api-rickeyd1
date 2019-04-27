export class Role {
    roleID: number;     // primary key
    role: string;       // not null, unique

    constructor(roleID = 0, role = '') {
        this.roleID = roleID;
        this.role = role;
    }
}