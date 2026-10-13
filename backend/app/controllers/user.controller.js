// app/controllers/user.controller.js
export const allAccess = (req, res) => {
  res.status(200).send("Contenido público.");
};
export const userBoard = (req, res) => {
  res.status(200).send("Contenido del usuario.");
};
export const adminBoard = (req, res) => {
  res.status(200).send("Contenido del administrador.");
};
export const moderatorBoard = (req, res) => {
  res.status(200).send("Contenido del moderador.");
};
