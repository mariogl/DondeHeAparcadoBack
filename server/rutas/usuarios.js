const express = require("express");
const {
  crearUsuario,
  loginUsuario,
} = require("../../db/controladores/usuarios");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const nuevoUsuario = req.body;
  const { error, datos } = await crearUsuario(nuevoUsuario);
  if (error) {
    return next(error);
  } else {
    res.json({ datos });
  }
});

router.post("/login", async (req, res, next) => {
  const credenciales = req.body;
  const { error, datos } = await loginUsuario(credenciales);
  if (error) {
    return next(error);
  } else {
    res.json({ datos });
  }
});

module.exports = router;
