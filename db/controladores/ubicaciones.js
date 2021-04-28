const { creaRespuesta } = require(".");
const Ubicacion = require("../modelos/ubicacion");

const getUbicaciones = async (idUsuario) => {
  const ubicaciones = await Ubicacion.find({
    usuario: idUsuario,
  }).sort({ fecha: 1 });
  return creaRespuesta(null, ubicaciones);
};

module.exports = {
  getUbicaciones,
};
