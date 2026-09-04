import { Router } from "express";

import veiculoRoutes from "../veiculo/veiculoRoutes.js";
import clienteRoutes from "../cliente/clienteRoutes.js";
import aluguelRoutes from "../aluguel/aluguelRoutes.js";

const routes = Router();

routes.use("/veiculos", veiculoRoutes);
routes.use("/clientes", clienteRoutes);
routes.use("/alugueis", aluguelRoutes);

export default routes;