export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

export const loadDatabaseConfig = (): DatabaseConfig => {
  const config = {
    host: '192.168.15.200',
    port: 5432,
    database: 'prime',
    username: 'postgres',
    password: 'postgres'
  };
  
  return config;
};