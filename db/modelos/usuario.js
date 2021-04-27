const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  ultimoLogin: Date,
  fechaRegistro: {
    type: Date,
    required: true,
  },
});

const Usuario = model("usuario", UsuarioSchema, "usuarios");

module.exports = Usuario;
