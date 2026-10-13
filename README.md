# Laboratorio 07 – Seguridad en aplicaciones con JWT

## Back-end
1. Crear la base de datos en MySQL: `CREATE DATABASE db_jwt;`
2. Revisar usuario y contraseña en `backend/app/config/db.config.js`.
3. `cd backend` → `npm install` → `npm start` (puerto 3000).
4. Insertar los roles:
   INSERT INTO roles VALUES (1,'user',now(),now());
   INSERT INTO roles VALUES (2,'moderator',now(),now());
   INSERT INTO roles VALUES (3,'admin',now(),now());

## Front-end
`cd frontend` → `npm install` → `npm run dev` (http://localhost:5173)
