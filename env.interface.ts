export interface DatabaseConfig {
  MARIADB_PORT: number;
  MARIADB_HOST: string;
  MARIADB_USER: string;
  MARIADB_PASSWORD: string;
  MARIADB_DATABASE: string;
}

export interface MongoDbConfig {
  MONGODB_URI: string;
}

export interface AppConfig {
  PORT: number;
  APP_ENV: string;
}

export type ConfigType = DatabaseConfig & MongoDbConfig & AppConfig;
