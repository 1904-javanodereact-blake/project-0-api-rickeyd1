import { User } from './model/user';
import { Role } from './model/role';

export let uRoles: Role[] = [
    new Role(0, 'admin'),
    new Role(1, 'finance-manager'),
    new Role(2, 'employee')
];

export let users: User[] = [
    new User(1, 'GBenson', 'Audrey', 'Gumball', 'Benson', 'gbennington@workmail.com', uRoles[0] ),
    new User(2, 'GSkips', 'Walks', 'Gorilla', 'Skips', 'wSkips@workmail.com', uRoles[1]),
    new User(3, 'BlueJay23', 'MCJ', 'Jay', 'Mordecai', 'jMordecai@workmail.com', uRoles[2]),
    new User(4, 'Hambone27', 'The-power', 'Raccoon', 'Rigby', 'rRigby@workmail.com', uRoles[2]),
    new User(5, 'MM13', 'myMom', 'Mitch', 'Sorenstein', 'mSorenstein@workmail.com', uRoles[1]),
    new User(6, 'mPops', 'password', 'Pops', 'Maellard', 'pMaellard@workmail.com', uRoles[0])
];

// Theme is going to be Arrested Development - mid season twist
