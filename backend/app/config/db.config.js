// app/config/db.config.js
// En local usa MySQL (Docker). En producción (Render) se usa DATABASE_URL.
export default {
  DATABASE_URL: process.env.DATABASE_URL || "",
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "root",
  PASSWORD: process.env.DB_PASSWORD || "",
  DB: process.env.DB_NAME || "db_jwt",
  PORT: Number(process.env.DB_PORT) || 3307,
  dialect: process.env.DB_DIALECT || "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
