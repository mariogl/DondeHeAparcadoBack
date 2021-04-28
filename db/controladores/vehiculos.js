const { creaRespuesta } = require(".");
const { creaError } = require("../../server/errores");
const Usuario = require("../modelos/usuario");
const Vehiculo = require("../modelos/vehiculo");

const formateaColorHex = (hexColor) => {
  if (hexColor[0] !== "#") {
    hexColor = `#${hexColor}`;
  }
  let colorNumber = hexColor.slice(1);
  if (colorNumber.length === 3) {
    colorNumber = colorNumber
      .split("")
      .map((digito) => digito + digito)
      .join("");
  }
  return `#${colorNumber}`;
};

const getVehiculo = async (id, idUsuario) => {
  const vehiculo = await Vehiculo.findOne(
    {
      _id: id,
      usuario: idUsuario,
    },
    "nombre color"
  );
  if (!vehiculo) {
    return creaRespuesta(creaError("No existe el vehículo", 404));
  } else {
    return creaRespuesta(null, vehiculo);
  }
};

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
    nuevoVehiculo.color = formateaColorHex(nuevoVehiculo.color);
    const vehiculoCreado = await Vehiculo.create(nuevoVehiculo);
    return creaRespuesta(null, {
      id: vehiculoCreado.id,
      nombre: vehiculoCreado.nombre,
    });
  }
};

const sustituirVehiculo = async (nuevoVehiculo) => {
  const usuarioExiste = await Usuario.findById(nuevoVehiculo.usuario);
  if (!usuarioExiste) {
    return creaRespuesta(creaError("No existe el usuario", 404));
  }
  const vehiculoExiste = await Vehiculo.findById(nuevoVehiculo.id);
  if (!vehiculoExiste) {
    return creaRespuesta(creaError("No existe el vehículo", 404));
  } else {
    nuevoVehiculo.color = formateaColorHex(nuevoVehiculo.color);
    const vehiculoSustituido = await Vehiculo.findByIdAndUpdate(
      nuevoVehiculo.id,
      nuevoVehiculo
    );
    return creaRespuesta(null, {
      id: vehiculoSustituido.id,
      nombre: vehiculoSustituido.nombre,
    });
  }
};

const borrarVehiculo = async (id, idUsuario) => {
  const vehiculoBorrado = await Vehiculo.findOneAndRemove({
    _id: id,
    usuario: idUsuario,
  });
  if (!vehiculoBorrado) {
    return creaRespuesta(creaError("No existe el vehículo", 404));
  } else {
    return creaRespuesta(null, { id: vehiculoBorrado._id });
  }
};

module.exports = {
  getVehiculo,
  crearVehiculo,
  sustituirVehiculo,
  borrarVehiculo,
};
