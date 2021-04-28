require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { creaRespuesta } = require(".");
const { creaError } = require("../../server/errores");
const Usuario = require("../modelos/usuario");

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

const loginUsuario = async ({ username, password }) => {
  const existeUsuario = await Usuario.findOne({ username });
  if (!existeUsuario) {
    return creaRespuesta(
      creaError("Datos de inicio de sesión incorrectos", 403)
    );
  } else {
    const passwordCorrecto = await bcrypt.compare(
      password,
      existeUsuario.password
    );
    if (!passwordCorrecto) {
      return creaRespuesta(
        creaError("Datos de inicio de sesión incorrectos", 403)
      );
    } else {
      const datosUsuario = {
        id: existeUsuario._id,
        nombre: existeUsuario.nombre,
      };
      const token = jwt.sign(datosUsuario, process.env.JWT_SIGN_KEY, {
        expiresIn: "24h",
      });
      return creaRespuesta(null, { token });
    }
  }
};

module.exports = {
  crearUsuario,
  loginUsuario,
};
