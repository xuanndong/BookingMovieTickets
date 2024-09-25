import kpg from 'pg';
import 'dotenv/config';
const Client = kpg.Client;
const SQL = `
create table if not exists accounts (
    account_id integer primary key generated always as identity,
    username varchar(255),
    email varchar(255),
    hashpwd varchar(255),
    salt varchar(20)
);

`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.QUERY,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();