import express from "express";
import swaggerUi from "swagger-ui-express";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { openapiSpec } from "./docs/openapiSpec.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.use(routes);

app.use(errorHandler);

export default app;