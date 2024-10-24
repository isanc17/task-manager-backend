import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import usuarioRoutes from "./routes/usuarioRoutes";
import tareasRouter from "./routes/tareasRoutes";
import loginRoutes from "./routes/loginRoutes";
import { autenticarToken } from "./middleware/loginMiddleware";

const app: Application = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(loginRoutes);
app.use(autenticarToken);
app.use("/usuarios", usuarioRoutes);
app.use("/tasks", tareasRouter);

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Ruta no encontrada.",
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
