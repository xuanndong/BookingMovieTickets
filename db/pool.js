import pkg from 'pg';
const Pool = pkg.Pool;

// All of the following properties should be read from enviroment variables
// We're hardcoding them here for simplicity
const pool = new Pool({
    connectionString: process.env.QUERY,
});

export default {
    pool,
};