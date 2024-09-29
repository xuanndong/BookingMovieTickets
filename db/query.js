import pool from "./pool.js";


// Add an account to the database
async function addAccounts(account) {
    await pool.pool.query(`
        insert into accounts (username, email, hashpwd)
        values
            ($1, $2, $3); 
    `, [account.username, account.email, account.hashpwd]);
}

// Log in to your account
async function getAccount(account) {
    const { rows } = await pool.pool.query(`
        select * from accounts
        where username = $1 and hashpwd = $2;
    `, [account.username, account.hashpwd]);

    return rows;
}

export default {
    addAccounts,
    getAccount,
};