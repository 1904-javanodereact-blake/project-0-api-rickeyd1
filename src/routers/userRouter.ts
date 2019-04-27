import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import * as userDao from '../daos/users.dao';

/**
 * User router will handle all requests starting with
 *  /users
 */
export const userRouter = express.Router();

/**
 * Finds all users
 * enpoint: /users
 * method: GET
 */
userRouter.get('', [authMiddleware(['admin', 'finance-manager']), async (req, res) => {
    console.log('Retrieving users...');
    const user = await userDao.findAllUsers();
    res.json(user);
}]);

// [authMiddleware(['admin', 'finance-manager']),

/**
 * Finds a user by their user id
 * endpoint: /users/:id
 * method: GET
 */
userRouter.get('/:id', [(req, res, next) => {
    const userID: number = req.session.user.userId;
    const userRole: string = req.session.user.role.role;
    if ( userID === +req.params.id) {
        console.log('Id of user session matches requested user...');
        next();
    } else if (userRole === 'admin' || userRole === 'finance-manager') {
        console.log('User has the required permissions to view');
        next();
    } else {
        const resp = {
            message: 'The incoming token has expired'
        };
        res.status(401).json(resp);
    }
}, async (req, res) => {
    const id: number = +req.params.id;
    console.log(`Getting user with id: ${req.params.id}...`);
    const user = await userDao.findUserByID(id);
    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404);
    }
}]);

/**
 * Updates a user record in our database.
 * endpoint: /users
 * method: POST
 */
userRouter.patch('', [authMiddleware(['admin']), async (req, res) => {
    console.log(`Patching user with new data...`);
    const { userId } = req.body;
    const user = await userDao.findUserByID(userId);
    const newUser = user;

    for (const field in newUser) {
        if ( (newUser[field] !== req.body[field]) && (req.body[field] !== undefined)) {
            newUser[field] = req.body[field];
        }
    }
    await userDao.updateUser(user.userId, newUser.username, newUser.password, newUser.firstName, newUser.lastName, newUser.email,
        newUser.role);

    console.log(`User ${userId} has been updated`);
    const updateUser = await userDao.findUserByID(userId);
    res.send(updateUser);
}]);