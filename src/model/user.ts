import { Role } from './role';

export class User {
    userId: number;     // primary key
    username: string;   // not null, unique
    password: string;   // not null
    firstName: string;  // not null
    lastName: string;   // not null
    email: string;      // not null
    role: Role;         // not null
    img: string;

    constructor(userId = 0, username = '', password = '',
    firstName = '', lastName = '', email = '', role: Role, img = '') {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.img = img;
    }
}