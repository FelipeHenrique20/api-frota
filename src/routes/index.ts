import { Router } from "express";

import veiculoRoutes from "../veiculo/veiculoRoutes.js";

const routes = Router();

routes.use("/veiculos", veiculoRoutes);

export default routes;