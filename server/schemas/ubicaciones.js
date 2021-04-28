const ubicacionSchema = {
  localizacion: {
    exists: {
      errorMessage: "Falta la localización",
    },
    isObject: {
      errorMessage: "La localización debe ser un objeto",
    },
  },
  "localizacion.type": {
    exists: {
      errorMessage: "Falta el tipo de geolocalización",
    },
    equals: {
      options: "Point",
      errorMessage: "El tipo de geolocalización sólo puede ser Point",
    },
  },
  "localizacion.coordinates": {
    exists: {
      errorMessage: "Faltan las coordenadas",
    },
    isArray: {
      options: {
        min: 2,
        max: 2,
      },
      errorMessage: "Coordenadas incorrectas",
    },
  },
  "localizacion.coordinates.*": {
    isNumeric: {
      errorMessage: "Coordenadas incorrectas",
    },
  },
  vehiculo: {
    exists: {
      errorMessage: "Falta el vehiculo",
    },
    isMongoId: {
      errorMessage: "La id es incorrecta",
    },
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

module.exports = ubicacionSchema;
