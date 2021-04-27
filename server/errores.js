const { validationResult } = require("express-validator");

const creaError = (mensaje, codigoStatus = 500) => ({
  mensaje,
  codigoStatus,
});

const error404 = (req, res, next) => {
  const error = creaError("El endpoint no existe", 404);
  next(error);
};

const errorGeneral = (err, req, res, next) => {
  const status = err.codigoStatus || 500;
  const mensaje = err.mensaje || "Ha ocurrido un error";
  res.status(status).json({ error: true, msj: mensaje });
};

const checkBadRequest = (req, next, debug) => {
  const resultadoErrores = validationResult(req);
  if (!resultadoErrores.isEmpty()) {
    const errores = resultadoErrores.mapped();
    debug(errores);
    return next(creaError("La petición no tiene la forma correcta", 400));
  }
};

module.exports = {
  creaError,
  error404,
  errorGeneral,
  checkBadRequest,
};
