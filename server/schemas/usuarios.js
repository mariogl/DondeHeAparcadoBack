const usuarioSchema = {
  nombre: {
    exists: {
      errorMessage: "Falta el nombre",
    },
    isLength: {
      errorMessage: "El nombre tiene que tener 2 caracteres como mínimo",
      options: {
        min: 2,
      },
    },
  },
  username: {
    exists: {
      errorMessage: "Falta el username",
    },
    isLength: {
      errorMessage: "El username tiene que tener 4 caracteres como mínimo",
      options: {
        min: 4,
      },
    },
  },
  password: {
    exists: {
      errorMessage: "Falta la contraseña",
    },
    isLength: {
      errorMessage: "La contraseña tiene que tener 6 caracteres como mínimo",
      options: {
        min: 6,
      },
    },
  },
  email: {
    exists: {
      errorMessage: "Falta el correo electrónico",
    },
    isEmail: {
      errorMessage: "El correo electrónico no es válido",
    },
  },
};

const datosAccesoUsuarioSchema = {
  username: {
    exists: true,
    errorMessage: "Falta el username",
  },
  password: {
    exists: true,
    errorMessage: "Falta la contraseña",
  },
};

module.exports = {
  usuarioSchema,
  datosAccesoUsuarioSchema,
};
