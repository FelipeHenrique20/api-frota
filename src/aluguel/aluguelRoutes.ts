import { Router } from "express";
import { criar, devolver, listar, buscar } from "./aluguelController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.post("/", asyncHandler(criar));
router.patch("/:id/devolver", asyncHandler(devolver));
router.get("/", asyncHandler(listar));
router.get("/:id", asyncHandler(buscar));

export default router;