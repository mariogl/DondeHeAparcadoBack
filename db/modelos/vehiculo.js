const { Schema, model } = require("mongoose");

const VehiculoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "usuario",
    required: true,
  },
});

const Vehiculo = model("vehiculo", VehiculoSchema, "vehiculos");

module.exports = Vehiculo;
