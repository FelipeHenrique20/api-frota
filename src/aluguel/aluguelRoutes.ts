import { Router } from "express";
import { criar, devolver, listar, buscar } from "./aluguelController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middlewares/validate.js";
import { criarAluguelSchema } from "./aluguelSchema.js";

const router = Router();

router.post("/", validate(criarAluguelSchema), asyncHandler(criar));
router.patch("/:id/devolver", asyncHandler(devolver));
router.get("/", asyncHandler(listar));
router.get("/:id", asyncHandler(buscar));

export default router;