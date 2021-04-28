const express = require("express");
const debug = require("debug")("DHA:rutas:vehiculos");
const { checkSchema, param } = require("express-validator");
const { crearVehiculo } = require("../../db/controladores/vehiculos");
const Usuario = require("../../db/modelos/usuario");
const Vehiculo = require("../../db/modelos/vehiculo");
const { checkBadRequest, creaError } = require("../errores");
const { vehiculoSchema } = require("../schemas/vehiculos");

const router = express.Router();

router.get("/", (req, res, next) => {});

router.get(
  "/:id",
  param("id", "Id incorrecta").isMongoId(),
  (req, res, next) => {}
);

router.post(
  "/",
  checkSchema(vehiculoSchema),
  checkBadRequest(debug),
  async (req, res, next) => {
    const nuevoVehiculo = req.body;
    const { idUsuario } = req;
    if (nuevoVehiculo.usuario !== idUsuario) {
      return next(creaError("Usuario incorrecto", 400));
    }
    const { error, datos } = await crearVehiculo(nuevoVehiculo);
    if (error) {
      return next(error);
    } else {
      res.json({ datos });
    }
  }
);

router.put(
  "/:id",
  param("id", "Id incorrecta").isMongoId(),
  checkSchema(vehiculoSchema),
  (req, res, next) => {}
);

router.delete(
  "/:id",
  param("id", "Id incorrecta").isMongoId(),
  (req, res, next) => {}
);

module.exports = router;
