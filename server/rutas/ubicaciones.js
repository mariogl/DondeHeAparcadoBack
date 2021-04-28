const debug = require("debug")("DHA:rutas:ubicaciones");
const express = require("express");
const { checkSchema, param } = require("express-validator");
const { checkBadRequest } = require("../errores");
const ubicacionSchema = require("../schemas/ubicaciones");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Listado de ubicaciones");
});

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
  (req, res, next) => {}
);

module.exports = router;
