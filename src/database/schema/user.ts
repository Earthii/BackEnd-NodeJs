import Sequelize from 'sequelize';
import { sequelize } from './../../database/database';

export const User = sequelize.define('user', {
  username: { type: Sequelize.STRING, allowNull: false, unique: true },
  password: { type: Sequelize.STRING, allowNull: false }
}, {
  instanceMethods:{
    toJSON: function(){
      console.log("WE IN THERE", this);
      return this;
    }
  }
});

User.sync();

