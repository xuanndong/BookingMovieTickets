import bcrypt from "bcryptjs";
import pool from "./pool.js";

// Add an account to the database
async function addAccount(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, process.env.BCRYPT_SALT);

    // INJECTION ATTACK SAFE METHOD FOR CUSTOMIZABLE QUERIES
    await pool.pool.query(`
        insert into accounts (username, email, password)
        values
            ($1, $2, $3);
    `, [username, email, hashedPassword]);
}

// Log in to your account
async function getAccount(username, password) {
    const { rows } = await pool.pool.query(`
        select * from accounts
        where username = $1 and password = $2;
    `, [username, password]);

    return rows;
}

async function getUserByID(id) {
    const query = 'SELECT * FROM accounts WHERE account_id = $1';
    // INJECTION ATTACK SAFE METHOD FOR CUSTOMIZABLE QUERIES
    const { rows } = await pool.pool.query(query, [id]);
    return rows[0];
}

async function getUsserByUserName(username) {
    const query = 'SELECT * FROM accounts WHERE username = $1';
    // INJECTION ATTACK SAFE METHOD FOR CUSTOMIZABLE QUERIES
    const { rows } = await pool.pool.query(query, [username]);
    return rows[0];
}

export default {
    addAccount,
    getAccount,
    getUsserByUserName,
    getUserByID,
};
