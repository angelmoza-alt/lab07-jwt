// app/middlewares/authJwt.js
import jwt from "jsonwebtoken";
import db from "../models/index.js";
import authConfig from "../config/auth.config.js";

const { user: User } = db;

// Verifica la validez del token JWT
export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "¡No se proporcionó un token!" });
  }
  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), authConfig.secret);
    req.userId = decoded.id;
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(401).json({ message: "¡No autorizado!" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "¡No autorizado!" });
  }
};

// Función auxiliar: verifica si el usuario tiene alguno de los roles indicados
const hasAnyRole = (allowed, message) => async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();
    if (roles.some((role) => allowed.includes(role.name))) {
      return next();
    }
    res.status(403).json({ message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const isAdmin = hasAnyRole(["admin"], "¡Se requiere el rol de administrador!");
export const isModerator = hasAnyRole(["moderator"], "¡Se requiere el rol de moderador!");
export const isModeratorOrAdmin = hasAnyRole(
  ["admin", "moderator"],
  "¡Se requiere el rol de moderador o administrador!"
);
