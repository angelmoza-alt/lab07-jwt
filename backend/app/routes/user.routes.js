// app/routes/user.routes.js
import { Router } from "express";
import { authJwt } from "../middlewares/index.js";
import { allAccess, userBoard, moderatorBoard, adminBoard } from "../controllers/user.controller.js";

const router = Router();

router.get("/all", allAccess);
router.get("/user", [authJwt.verifyToken], userBoard);
router.get("/mod", [authJwt.verifyToken, authJwt.isModerator], moderatorBoard);
router.get("/admin", [authJwt.verifyToken, authJwt.isAdmin], adminBoard);

export default router;
