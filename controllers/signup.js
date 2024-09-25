import db from '../db/query.js';
import 'dotenv/config';

async function indexDeisgn(req, res) {
    res.render('index');
}

async function createAccountsPost(req, res) {
    await db.addAccounts(req.body);
    res.send('Sign Up Completed');
}

export default {
    createAccountsPost,
    indexDeisgn,
};