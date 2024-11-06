import { Router } from "express";
import { login } from "../controllers/loginController";
import { handleValidationErrors } from "../models/middleware/validationHandler";
import { loginValidator } from "../models/middleware/loginValidator";

const router = Router();

// Ruta de login
router.get("/login", loginValidator, handleValidationErrors(true), login);

export default router;
