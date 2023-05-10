// POST /signup - should use bcrypt on the incoming password. Store user with their email and encrypted password, handle conflicts when the email is already in use.
// POST / - find the user with the provided email. Use bcrypt to compare stored password with the incoming password. If they match, generate a random token with uuid and return it to the user.
// POST /password - If the user is logged in, store the incoming password using their userId
// POST /logout - If the user is logged in, invalidate their token so they can't use it again (remove it)

const bcrypt = require('bcrypt');
const router = require('express').Router();
const { createUser, getUser, updateUserPassword } = require('../daos/user');
const { makeTokenForUserId, removeToken } = require('../daos/token');
const { isLoggedIn } = require('../middleware/auth');

router.post('/signup', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email)
            return res.status(400).send('no email provided');

        if (!password)
            return res.status(400).send('no password provided');

        const user = await getUser(email);

        if (user) {
            return res.status(409).send('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser({ email, password: hashedPassword });
        return res.sendStatus(200);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!password)
            return res.sendStatus(400);
    
        const user = await getUser(email);

        if (user == null) {
            return res.sendStatus(401);
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.sendStatus(401);
        }

        const token = await makeTokenForUserId(user._id);
        res.send({ token });

    } catch (err) {
        next(err);
    }
});

router.post('/password', isLoggedIn, async (req, res, next) => {
    const { password } = req.body;
    try {
        if (!password) {
            return res.sendStatus(400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await updateUserPassword(req.userId, hashedPassword);
        return res.sendStatus(200);
    } catch (err) {
        next(err);
    }
});

router.post('/logout', isLoggedIn, async (req, res, next) => {
    try {
        const token = req.token;
        let result = await removeToken(token);
        if (result)
            return res.sendStatus(200)

        return res.sendStatus(401)
    } catch (err) {

        next(err);
    }
});

module.exports = router;