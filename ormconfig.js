require("dotenv").config();

const POSTGRES_USER = "postgres";
const POSTGRES_PASSWORD = "123456";
const POSTGRES_DB = "postgres";

const env = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  url:
    process.env.NODE_ENV === "production"
      ? process.env.DATABASE_URL
      : `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5444/${POSTGRES_DB}`,
  synchronize: true,
  logging: false,
  entities:
    process.env.NODE_ENV === "production"
      ? ["dist/models/.js"]
      : ["src/models/*ts"],
  migrations:
    process.env.NODE_ENV === "production"
      ? ["dist/migrations/.js"]
      : ["src/migrations/*ts"],
  cli: {
    migrationsDir: "./src/migrations",
  },
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
};

module.exports = env;