require("dotenv").config();
const debug = require("debug")("DHA:server");
const chalk = require("chalk");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const rutasUsuarios = require("./rutas/usuarios");
const rutasVehiculos = require("./rutas/vehiculos");
const rutasUbicaciones = require("./rutas/ubicaciones");

const opcionesCLI = require("../parametrosCLI");
const { error404, errorGeneral } = require("./errores");
const auth = require("./middlewares/auth");

const app = express();
const puerto = opcionesCLI.puerto || process.env.PUERTO || 6000;
const server = app.listen(puerto, () => {
  debug(chalk.yellow(`Servidor escuchando en http://localhost:${puerto}`));
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    debug(chalk.red.bold(`El puerto ${puerto} está ocupado`));
  } else {
    debug(chalk.red.bold("Error al levantar el servidor"));
  }
  process.exit(1);
});

const origenesWhitelist = ["http://localhost"];

app.use(morgan("dev"));
app.use(cors(origenesWhitelist));
app.use(express.json());
app.use("/usuarios", rutasUsuarios);
app.use("/vehiculos", auth, rutasVehiculos);
app.use("/ubicaciones", auth, rutasUbicaciones);
app.get("/", (req, res, next) => {
  res.redirect("/ubicaciones");
});
app.use(error404);
app.use(errorGeneral);

module.exports = app;
