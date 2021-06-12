const mongoose = require('mongoose');
const { Schema } = mongoose

const pacienteSchema = new Schema({
  nombre: {
    type: Schema.Types.String,
    trim: true,
  },
  propietario: {
    type: Schema.Types.String,
    trim: true,
  },
  fecha: {
    type: Schema.Types.String,
    trim: true,
  },
  hora: {
    type: Schema.Types.String,
    trim: true,
  },
  sintomas: {
    type: Schema.Types.String,
    trim: true,
  },
});


module.exports = mongoose.model('Paciente', pacienteSchema)