export interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
}

export const DBConfig: DatabaseConfig = {
  username: "root",
  password: "password",
  database: "myosdb",
  host: "127.0.0.1",
  port: 3306
};
