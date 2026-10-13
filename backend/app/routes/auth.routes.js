// app/routes/auth.routes.js
import { Router } from "express";
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from "../middlewares/index.js";
import { signup, signin } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", [checkDuplicateUsernameOrEmail, checkRolesExisted], signup);
router.post("/signin", signin);

export default router;
