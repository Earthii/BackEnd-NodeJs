import Sequelize from 'sequelize';
import { sequelize } from './../../database/database';

export const Message = sequelize.define('message', {
    message: Sequelize.STRING,
    date: Sequelize.DATE
  });
  