import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './routers/userRouter';
import { reimbursementRouter } from './routers/reimburseRouter';
import { sessionMiddleware } from './middleware/session.middleware';
import * as userDao from './daos/users.dao';

const app = express();
const port = process.env.SHIP_PORT || 8080;

app.use(bodyParser.json());


app.use(sessionMiddleware);

// allow cross origins
app.use((req, resp, next) => {
    // console.log(req.get('host'));
    (process.env.SHIP_API_STAGE === 'prod')
      ? resp.header('Access-Control-Allow-Origin', process.env.SHIP_APP_URL)
      : resp.header('Access-Control-Allow-Origin', `${req.headers.origin}`);
    resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    resp.header('Access-Control-Allow-Credentials', 'true');
    resp.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, PATCH');
    next();
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await userDao.findUsernameAndPassword(username, password);

    if (user) {
        req.session.user = user;
        console.log('User successfully signed in...');
        res.json(user);
    } else {
        const resp = {
            message: 'Invalid credentials'
        };
        res.status(401).json(resp);
    }
});

app.get('/logout', async (req, res) => {
    req.session.destroy(err => console.log(err));
    res.send('User has been disconnected from the session');
});

/**
 * Register routers
 */
app.use('/users', userRouter);
app.use('/reimbursements', reimbursementRouter);

app.listen(port, () => {
    console.log('application started');
});

