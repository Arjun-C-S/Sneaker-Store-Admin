import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigType } from 'env.interface';
import { AuthTable } from 'src/modules/auth/schema/auth.schema';
import { CategoryTable } from 'src/modules/category/schema/category.schema';
import { SessionTable } from 'src/modules/session/schema/session.schema';

// NOTE: Add typeORM entities to this list
const ENTITY_LIST = [CategoryTable, AuthTable, SessionTable];

export function configureTypeorm(
  config: ConfigService<ConfigType>,
): TypeOrmModuleOptions {
  return {
    type: 'mariadb',
    host: config.get('MARIADB_HOST', { infer: true }),
    port: config.get('MARIADB_PORT', { infer: true }),
    username: config.get('MARIADB_USER', { infer: true }),
    password: config.get('MARIADB_PASSWORD', { infer: true }),
    database: config.get('MARIADB_DATABASE', { infer: true }),
    entities: ENTITY_LIST,
    synchronize: config.get('APP_ENV', { infer: true }) === 'development',
  };
}
