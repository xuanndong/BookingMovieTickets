import pool from "./pool.js";

async function getAccounts() {
    const { rows } = await pool.pool.query("SELECT * FROM accounts");
    return rows;
}

async function addAccounts(account) {
    await pool.pool.query(`
        insert into accounts (username, email, hashpwd)
        values
            ($1, $2, $3); 
    `, [account.username, account.email, account.hashpwd]);
}

export default {
    getAccounts,
    addAccounts,
};