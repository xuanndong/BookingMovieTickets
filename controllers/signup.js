import db from '../db/query.js';
import 'dotenv/config';

// DEFINE FUNCTION TO FETCH DATA FROM DB & CREATE NEW USER
async function signUpUser(req, res, next) {
    const { username, email, password } = req.body;
    const user = await db.getUsserByUserName(username);
    if (user) {
        return res.status(400).json({ error: [{ msg: 'Username already exists' }] });
    }

    await db.addAccount(username, email, password);
    next();
}

export {
    signUpUser,
};
