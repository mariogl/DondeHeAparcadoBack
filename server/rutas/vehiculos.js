const express = require("express");
const debug = require("debug")("DHA:rutas:vehiculos");
const { checkSchema, param } = require("express-validator");
const { checkBadRequest } = require("../errores");
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
  (req, res, next) => {}
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
