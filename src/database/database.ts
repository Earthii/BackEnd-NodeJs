import {Sequelize} from 'sequelize-typescript';
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

function initDb() {
  const databaseName = String(process.env.DB_NAME);
  const db_url = String(process.env.DB_URL);
  const db_port = Number(process.env.DB_PORT);
  const db_user = String(process.env.DB_USER);
  const db_pass = String(process.env.DB_PASS);
  
  const conn = mysql.createConnection({
    host:db_url,
    user: db_user,
    password: db_pass,
    port:db_port
  });

  conn.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`, (err, results, fields)=>{
    conn.end();
  })

  return new Sequelize({
    database: databaseName,
    username: db_user,
    password: db_pass,
    host: process.env.DB_URL || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    modelPaths: [__dirname + '/models/**/*.model.ts'],
    modelMatch: (filename, member) => {
      return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: false // mute deprecation warning for string based operators?
  });
}

export const sequelize = initDb();
