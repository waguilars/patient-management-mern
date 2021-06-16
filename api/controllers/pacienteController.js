const { request, response } = require('express');
const Paciente = require('../models/Paciente');

exports.nuevoCliente = async (req = request, res = response, next) => {
  const body = req.body;

  try {
    const paciente = new Paciente(body);
    const newPaciente = await Paciente.create(paciente);
    res.json({
      mensaje: 'El cliente se agrego correctamente',
      paciente: newPaciente,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.obtenerPacientes = async (req = request, res = response, next) => {
  try {
    const pacientes = await Paciente.find({});
    res.json({
      pacientes
    })
  } catch (error) {
    console.log(error)
  }
};

exports.obtenerPaciente = async (req = request, res = response, next) => {
  const { id } = req.params
  try {
    const paciente = await Paciente.findById(id)
    res.json({
      paciente
    })
  } catch (error) {
    res.status(500).json({
      msg: 'error en el servidor.'
    })
  }
}

exports.actualizarPaciente = async (req = request, res = response, next) => {
  const { id } = req.params

  try {
    const paciente = await Paciente.findOneAndUpdate({_id: id}, req.body, { new: true })
    res.json({
      mensaje: 'Datos actualizados.',
      paciente
    })
  } catch (error) {
    console.log(error)
  }
}

exports.eliminarPaciente = async (req = request, res = response, next) => { 
  const { id } = req.params
  try {
    await Paciente.findOneAndDelete({_id: id})

    res.json({
      mensaje: 'Paciente eliminado'
    })
  } catch (error) {
    console.log(error)
    next()
  }
}
