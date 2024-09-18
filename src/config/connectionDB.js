import mysql from 'mysql2/promise';

console.log("Creating connection pool...");

const pool = mysql.createPool({

    host: 'localhost',

    user: 'root',

    port: "3306",

    database: 'hospital',

    password: '1234'
})

export default pool;