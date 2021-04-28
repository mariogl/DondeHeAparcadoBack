const express = require("express");
const debug = require("debug")("DHA:rutas:usuarios");
const { checkSchema, validationResult } = require("express-validator");
const {
  crearUsuario,
  loginUsuario,
} = require("../../db/controladores/usuarios");
const { checkBadRequest } = require("../errores");
const auth = require("../middlewares/auth");
const {
  usuarioSchema,
  datosAccesoUsuarioSchema,
} = require("../schemas/usuarios");

const router = express.Router();

router.post(
  "/",
  auth,
  checkSchema(usuarioSchema),
  checkBadRequest(debug),
  async (req, res, next) => {
    const nuevoUsuario = req.body;
    const { error, datos } = await crearUsuario(nuevoUsuario);
    if (error) {
      return next(error);
    } else {
      res.json({ datos });
    }
  }
);

router.post(
  "/login",
  checkSchema(datosAccesoUsuarioSchema),
  checkBadRequest(debug),
  async (req, res, next) => {
    const credenciales = req.body;
    const { error, datos } = await loginUsuario(credenciales);
    if (error) {
      return next(error);
    } else {
      res.json({ datos });
    }
  }
);

module.exports = router;
