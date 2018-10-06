import mysql from 'mysql';

export function initDb() {
  let connection = mysql.createConnection({
    host: process.env.DB_URL || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: 'admin',
    password: 'nimda',
    database: 'test'
  });

  connection.connect(err => {
    if (err) throw err;
    console.log('Connected!');
  });

  connection.end();
}
