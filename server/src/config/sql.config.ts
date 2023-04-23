import { registerAs } from '@nestjs/config';
import { Dialect } from 'sequelize';

export const sqlConfig = registerAs('database', () => ({
  dialect: <Dialect>process.env.DB_DIALECT || 'mysql',
  logging: String(process.env.DB_LOGGING) === 'true' ? true : false,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  autoLoadModels: true,
  synchronize: true,
}));
