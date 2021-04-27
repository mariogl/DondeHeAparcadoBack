const express = require("express");
const debug = require("debug")("DHA:rutas:usuarios");
const { checkSchema, validationResult } = require("express-validator");
const {
  crearUsuario,
  loginUsuario,
} = require("../../db/controladores/usuarios");
const { checkBadRequest } = require("../errores");
const {
  nuevoUsuarioSchema,
  datosAccesoUsuarioSchema,
} = require("../schemas/usuarios");

const router = express.Router();

router.post("/", checkSchema(nuevoUsuarioSchema), async (req, res, next) => {
  const nuevoUsuario = req.body;
  checkBadRequest(req, next, debug);
  const { error, datos } = await crearUsuario(nuevoUsuario);
  if (error) {
    return next(error);
  } else {
    res.json({ datos });
  }
});

router.post(
  "/login",
  checkSchema(datosAccesoUsuarioSchema),
  async (req, res, next) => {
    const credenciales = req.body;
    checkBadRequest(req, next, debug);
    const { error, datos } = await loginUsuario(credenciales);
    if (error) {
      return next(error);
    } else {
      res.json({ datos });
    }
  }
);

module.exports = router;
