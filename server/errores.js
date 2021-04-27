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

module.exports = {
  creaError,
  error404,
  errorGeneral,
};
