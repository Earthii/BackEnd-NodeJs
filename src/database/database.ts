import Sequelize from 'sequelize';

function initDb(){
    console.log('Connect to database!')
    return new Sequelize('database', 'admin', 'nimda', {
        host: process.env.DB_URL || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        dialect: 'mysql',
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