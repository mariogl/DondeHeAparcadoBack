const { Schema, model } = require("mongoose");

const UbicacionSchema = new Schema({
  localizacion: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  vehiculo: {
    type: Schema.Types.ObjectId,
    ref: "vehiculo",
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "usuario",
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
});

const Ubicacion = model("ubicacion", UbicacionSchema, "ubicaciones");

module.exports = Ubicacion;
