require("dotenv").config();
const jwt = require("jsonwebtoken");
const { creaError } = require("../errores");

const auth = (req, res, next) => {
  const cabeceraAuth = req.header("Authorization");
  if (!cabeceraAuth) {
    next(creaError("Falta el token", 403));
  } else {
    try {
      const token = cabeceraAuth.split(" ")[1];
      const datosUsuario = jwt.verify(token, process.env.JWT_SIGN_KEY);
      req.idUsuario = datosUsuario.id;
      next();
    } catch {
      next(creaError("Token incorrecto", 403));
    }
  }
};

module.exports = auth;
