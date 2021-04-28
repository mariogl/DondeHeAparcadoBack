const debug = require("debug")("DHA:rutas:ubicaciones");
const express = require("express");
const { checkSchema, param } = require("express-validator");
const { checkBadRequest, creaError } = require("../errores");
const ubicacionSchema = require("../schemas/ubicaciones");
const {
  getUbicaciones,
  crearUbicacion,
} = require("../../db/controladores/ubicaciones");

const router = express.Router();

router.get(
  "/vehiculo/:id",
  param("id", "Id incorrecta").isMongoId(),
  checkBadRequest(debug),
  async (req, res, next) => {
    const { error, datos } = await getUbicaciones(req.idUsuario, req.params.id);
    if (error) {
      return next(error);
    } else {
      res.json({ datos });
    }
  }
);

router.get(
  "/:id",
  param("id", "Id incorrecta").isMongoId(),
  checkBadRequest(debug),
  (req, res, next) => {}
);

router.post(
  "/",
  checkSchema(ubicacionSchema),
  checkBadRequest(debug),
  async (req, res, next) => {
    const nuevaUbicacion = req.body;
    const { idUsuario } = req;
    if (nuevaUbicacion.usuario !== idUsuario) {
      return next(creaError("Usuario incorrecto", 400));
    }
    const { error, datos } = await crearUbicacion(nuevaUbicacion);
    if (error) {
      return next(error);
    } else {
      res.json({ datos });
    }
  }
);

module.exports = router;
