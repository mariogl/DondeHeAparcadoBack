const vehiculoSchema = {
  nombre: {
    exists: true,
    errorMessage: "Falta el nombre",
  },
  color: {
    isHexColor: {
      errorMessage: "El color es incorrecto",
    },
    optional: true,
  },
  usuario: {
    exists: {
      errorMessage: "Falta el usuario",
    },
    isMongoId: {
      errorMessage: "La id es incorrecta",
    },
  },
};

module.exports = {
  vehiculoSchema,
};
