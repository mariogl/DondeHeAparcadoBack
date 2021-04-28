const { creaRespuesta } = require(".");
const { creaError } = require("../../server/errores");
const Ubicacion = require("../modelos/ubicacion");
const Usuario = require("../modelos/usuario");
const Vehiculo = require("../modelos/vehiculo");

const getUbicaciones = async (idUsuario, idVehiculo) => {
  const ubicaciones = await Ubicacion.find(
    {
      usuario: idUsuario,
      vehiculo: idVehiculo,
    },
    "-vehiculo -usuario -__v"
  ).sort({ fecha: 1 });
  return creaRespuesta(null, ubicaciones);
};

const crearUbicacion = async (nuevaUbicacion) => {
  const usuarioExiste = await Usuario.findById(nuevaUbicacion.usuario);
  if (!usuarioExiste) {
    return creaRespuesta(creaError("No existe el usuario", 404));
  }
  const vehiculoExiste = await Vehiculo.findById(nuevaUbicacion.vehiculo);
  if (!vehiculoExiste) {
    return creaRespuesta(creaError("No existe el vehículo", 404));
  }
  nuevaUbicacion.fecha = new Date();
  const ubicacionCreada = await Ubicacion.create(nuevaUbicacion);
  return creaRespuesta(null, {
    id: ubicacionCreada.id,
    fecha: ubicacionCreada.fecha,
  });
};

module.exports = {
  getUbicaciones,
  crearUbicacion,
};
