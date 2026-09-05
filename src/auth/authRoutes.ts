import { Router } from "express";
import { registrar, login } from "./authController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate} from "../middlewares/validate.js";
import { registrarSchema, loginSchema} from "./authSchema.js";

const router = Router();

router.post("/registrar", validate(registrarSchema), asyncHandler(registrar));
router.post("/login", validate(loginSchema), asyncHandler(login));

export default router;