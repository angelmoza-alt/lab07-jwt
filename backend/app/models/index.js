// app/models/index.js
import Sequelize from "sequelize";
import dbConfig from "../config/db.config.js";
import userModel from "./user.model.js";
import roleModel from "./role.model.js";

// Instancia de Sequelize:
// - Producción: se conecta con la URL de la base de datos (DATABASE_URL)
// - Local: se conecta con host, usuario, contraseña y puerto
const sequelize = dbConfig.DATABASE_URL
  ? new Sequelize(dbConfig.DATABASE_URL, {
      pool: dbConfig.pool,
      logging: false,
    })
  : new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
      host: dbConfig.HOST,
      port: dbConfig.PORT,
      dialect: dbConfig.dialect,
      pool: dbConfig.pool,
      logging: false,
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelos
db.user = userModel(sequelize, Sequelize);
db.role = roleModel(sequelize, Sequelize);

// Relación muchos a muchos entre roles y usuarios
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
  as: "roles",
});

// Roles permitidos
db.ROLES = ["user", "admin", "moderator"];

export default db;
