// server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import db from "./app/models/index.js";
import authRoutes from "./app/routes/auth.routes.js";
import userRoutes from "./app/routes/user.routes.js";

const app = express();

// Orígenes permitidos (en Render se configura CORS_ORIGIN con la URL del front-end)
const origins = (process.env.CORS_ORIGIN || "http://localhost:5173").split(",");
app.use(cors({ origin: origins }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta simple
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la aplicación JWT - Tecsup - Angel Moza Cabanillas." });
});

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/test", userRoutes);

// Crea los roles si no existen (así no se insertan a mano en producción)
const initialRoles = async () => {
  const Role = db.role;
  await Role.findOrCreate({ where: { id: 1 }, defaults: { name: "user" } });
  await Role.findOrCreate({ where: { id: 2 }, defaults: { name: "moderator" } });
  await Role.findOrCreate({ where: { id: 3 }, defaults: { name: "admin" } });
};

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(async () => {
  await initialRoles();
  console.log("Base de datos sincronizada.");
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}.`);
  });
});
