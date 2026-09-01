import { Router } from "express";
import { criar, atualizar, deletar, listar, buscar } from "./veiculoController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.post("/", asyncHandler(criar));
router.put("/:id", asyncHandler(atualizar));
router.delete("/:id", asyncHandler(deletar));
router.get("/", asyncHandler(listar));
router.get("/:identificador", asyncHandler(buscar));

export default router;