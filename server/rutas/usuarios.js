const express = require("express");
const { crearUsuario } = require("../../db/controladores/usuarios");
const { creaError } = require("../errores");

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

router.post("/login", (req, res, next) => {});

module.exports = router;
