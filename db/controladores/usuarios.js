const bcrypt = require("bcrypt");
const { creaError } = require("../../server/errores");
const Usuario = require("../modelos/usuario");

const creaRespuesta = (error, datos) => ({ error, datos });

const crearUsuario = async (nuevoUsuario) => {
  nuevoUsuario.password = await bcrypt.hash(nuevoUsuario.password, 10);
  nuevoUsuario.fechaRegistro = new Date();
  try {
    const usuarioCreado = await Usuario.create(nuevoUsuario);
    return creaRespuesta(null, { id: usuarioCreado._id });
  } catch {
    return creaRespuesta(creaError("No se ha podido crear el usuario", 409));
  }
};

module.exports = {
  crearUsuario,
};
