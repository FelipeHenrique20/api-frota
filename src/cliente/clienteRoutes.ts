import { Router } from "express";
import { criar, atualizar, deletar, listar, buscar } from "./clienteController.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middlewares/validate.js";
import { criarClienteSchema, atualizarClienteSchema } from "./clienteSchema.js";

const router = Router();

router.post("/", validate(criarClienteSchema), asyncHandler(criar));
router.put("/:id", validate(atualizarClienteSchema), asyncHandler(atualizar));
router.delete("/:id", asyncHandler(deletar));
router.get("/", asyncHandler(listar));
router.get("/:id", asyncHandler(buscar));

export default router;