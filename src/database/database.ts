import Sequelize from 'sequelize';
// import mysql from 'mysql';

export function initDb() {
  const sequelize = new Sequelize('test', 'admin', 'nimda', {
    host: process.env.DB_URL || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

  const User = sequelize.define('user', {
    username: Sequelize.STRING,
    birthday: Sequelize.DATE
  });

  sequelize
    .sync()
    .then(() =>
      User.create({
        username: 'ericdoe',
        birthday: new Date(1980, 6, 20)
      })
    )
    .then(jane => {
      console.log(jane);
    });
}
