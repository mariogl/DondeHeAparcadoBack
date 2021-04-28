const { creaRespuesta } = require(".");
const { creaError } = require("../../server/errores");
const Usuario = require("../modelos/usuario");
const Vehiculo = require("../modelos/vehiculo");

const crearVehiculo = async (nuevoVehiculo) => {
  const usuarioExiste = await Usuario.findById(nuevoVehiculo.usuario);
  if (!usuarioExiste) {
    return creaRespuesta(creaError("No existe el usuario", 404));
  }
  const vehiculoExiste = await Vehiculo.findOne({
    usuario: nuevoVehiculo.usuario,
    nombre: nuevoVehiculo.nombre,
  });
  if (vehiculoExiste) {
    return creaRespuesta(
      creaError("El usuario ya tiene un vehículo con ese nombre", 409)
    );
  } else {
    const vehiculoCreado = await Vehiculo.create(nuevoVehiculo);
    return creaRespuesta(null, {
      id: vehiculoCreado.id,
      nombre: vehiculoCreado.nombre,
    });
  }
};

module.exports = {
  crearVehiculo,
};
