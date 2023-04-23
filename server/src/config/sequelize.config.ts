import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeOptionsFactory, SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    const {
      sql: {
        dialect,
        logging,
        database,
        host,
        port,
        username,
        password,
        synchronize,
        autoLoadModels,
      },
    } = this.configService.get('database');

    return {
      dialect,
      logging,
      database,
      host,
      port,
      username,
      password,
      autoLoadModels,
      synchronize,
      models: [User],
      define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    };
  }
}
