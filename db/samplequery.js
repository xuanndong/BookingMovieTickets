import kpg from 'pg';
import 'dotenv/config';
const Client = kpg.Client;
const SQL = `
create table if not exists accounts (
    account_id uuid primary key default gen_random_uuid(),
    username varchar(100) not null unique,
    email varchar(200) not null unique,
    hashpwd text not null,
    salt varchar(20)
);

create table if not exists movies (
    movie_id serial primary key,
    movie_title varchar(100) not null,
    poster varchar(200) not null,
    director varchar(50) not null,
    description text,
    duration int not null,
    rating decimal(3,1),
    actors text not null,
    genres varchar(100)
);

create table if not exists rooms (
    room_id serial primary key,
    location varchar(255) not null,
    room_type varchar(100) check(room_type in ('2D', '3D', 'IMAX')) not null,
    seat_capacity int not null
);

create table if not exists showtimes (
    showtime_id serial primary key,
    showtime_date timestamp default current_timestamp,
    base_price decimal(15, 2),
    mov_id int,
    roo_id int,
    foreign key(mov_id) references movies(movie_id) on delete cascade,
    foreign key(roo_id) references rooms(room_id)
);

create table if not exists seats (
    seat_id serial primary key,
    seat_position varchar(10) not null,
    seat_status varchar(10) not null default 'available' check(seat_status in ('availabe', 'booked', 'broken')),
    seat_type varchar(100) check(seat_type in ('Standard', 'VIP', 'Couple')) not null,
    roo_id int not null,
    foreign key(roo_id) references rooms(room_id) on delete cascade
);

create table if not exists tickets (
    ticket_id serial primary key,
    sho_id int,
    acc_id uuid,
    sea_id int,
    created_at timestamp default current_timestamp,
    total_price decimal(15,2) not null,
    foreign key(acc_id) references accounts(account_id),
    foreign key(sho_id) references showtimes(showtime_id),
    foreign key(sea_id) references seats(seat_id)
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