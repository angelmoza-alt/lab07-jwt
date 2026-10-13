// app/controllers/auth.controller.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../models/index.js";
import authConfig from "../config/auth.config.js";

const { user: User, role: Role } = db;
const Op = db.Sequelize.Op;

// Registro de usuario
export const signup = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;
    const user = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, 8), // contraseña encriptada
    });

    if (roles && roles.length > 0) {
      const foundRoles = await Role.findAll({ where: { name: { [Op.or]: roles } } });
      await user.setRoles(foundRoles);
    } else {
      await user.setRoles([1]); // rol "user" por defecto
    }
    res.status(201).json({ message: "¡Usuario registrado exitosamente!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Inicio de sesión
export const signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
      include: { model: Role, as: "roles" },
    });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ accessToken: null, message: "¡Contraseña inválida!" });
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, { expiresIn: 86400 }); // 24 horas
    const authorities = user.roles.map((role) => `ROLE_${role.name.toUpperCase()}`);

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
