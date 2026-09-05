import { Router } from "express";

import veiculoRoutes from "../veiculo/veiculoRoutes.js";
import clienteRoutes from "../cliente/clienteRoutes.js";
import aluguelRoutes from "../aluguel/aluguelRoutes.js";
import authRoutes from "../auth/authRoutes.js";
import { autenticar } from "../middlewares/authMiddleware.js";

const routes = Router();

routes.use("/auth", authRoutes);

routes.use("/veiculos", autenticar, veiculoRoutes);
routes.use("/clientes", autenticar, clienteRoutes);
routes.use("/alugueis", autenticar, aluguelRoutes);

export default routes;