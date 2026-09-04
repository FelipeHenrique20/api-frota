import { Router } from "express";
import { criar, atualizar, deletar, listar, buscar } from "./veiculoController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middlewares/validate.js";
import { criarVeiculoSchema, atualizarVeiculoSchema } from "./veiculoSchema.js";

const router = Router();

router.post("/", validate(criarVeiculoSchema), asyncHandler(criar));
router.put("/:id", validate(atualizarVeiculoSchema), asyncHandler(atualizar));
router.delete("/:id", asyncHandler(deletar));
router.get("/", asyncHandler(listar));
router.get("/:id", asyncHandler(buscar));

export default router;