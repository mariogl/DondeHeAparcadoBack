const express = require("express");
const debug = require("debug")("DHA:rutas:vehiculos");
const { checkSchema, param } = require("express-validator");
const {
  crearVehiculo,
  sustituirVehiculo,
  borrarVehiculo,
} = require("../../db/controladores/vehiculos");
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
  checkBadRequest(debug),
  async (req, res, next) => {
    const nuevoVehiculo = req.body;
    nuevoVehiculo.id = req.params.id;
    const { idUsuario } = req;
    if (nuevoVehiculo.usuario !== idUsuario) {
      return next(creaError("Usuario incorrecto", 400));
    }
    const { error, datos } = await sustituirVehiculo(nuevoVehiculo);
    if (error) {
      return next(error);
    } else {
      res.json({ datos });
    }
  }
);

router.delete(
  "/:id",
  param("id", "Id incorrecta").isMongoId(),
  checkBadRequest(debug),
  async (req, res, next) => {
    const { error, datos } = await borrarVehiculo(req.params.id, req.idUsuario);
    if (error) {
      return next(error);
    } else {
      res.json({ datos });
    }
  }
);

module.exports = router;
