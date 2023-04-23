import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  login: string;

  @Column
  password: string;

  @Column
  email: string;

  @Column
  role_id: number;
}
