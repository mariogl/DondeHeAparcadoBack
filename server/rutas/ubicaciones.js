const debug = require("debug")("DHA:rutas:ubicaciones");
const express = require("express");
const { checkSchema, param } = require("express-validator");
const { checkBadRequest } = require("../errores");
const ubicacionSchema = require("../schemas/ubicaciones");
const { getUbicaciones } = require("../../db/controladores/ubicaciones");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const { error, datos } = await getUbicaciones(req.idUsuario);
  if (error) {
    return next(error);
  } else {
    res.json({ datos });
  }
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
