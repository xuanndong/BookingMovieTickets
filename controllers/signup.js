import db from '../db/query.js';
import 'dotenv/config';

// DEFINE FUNCTION TO FETCH DATA FROM DB & CREATE NEW USER
async function createAccount(req, res, next) {
    
    const { username, email, password } = req.body;
    const user = db.getUsserByUserName(username);
    if(user){
        return res.status(400).json({error: [{ msg: 'Username already exists' }] });
    }

    await db.addAccount(username, email, password);
    next();
};

export default {
    createAccount,
};
