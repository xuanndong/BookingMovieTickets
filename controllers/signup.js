import db from '../db/query.js';
import 'dotenv/config';

async function createAccount(req, res) {
    await db.addAccounts(req.body);
    res.send('Sign Up Completed');
}

export default {
    createAccount,
};