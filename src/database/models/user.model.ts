import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Unique,
  AllowNull
} from 'sequelize-typescript';

@Table({ timestamps: true })
export class User extends Model<User> {
  @Unique
  @AllowNull(false)
  @Column
  username!: string;

  @AllowNull(false)
  @Column
  password!: string;

  @CreatedAt
  creationDate!: Date;

  @UpdatedAt
  updatedOn!: Date;

  @DeletedAt
  deletionDate!: Date;

  toJSON = () => {
    var values = Object.assign({}, this.get());

    delete values.password;
    return values;
  };
}