const { Router } = require('express');
const { nuevoCliente, obtenerPacientes, obtenerPaciente, actualizarPaciente, eliminarPaciente } = require('../controllers/pacienteController');

const router = Router();

module.exports = () => {
  router.get('/pacientes', obtenerPacientes);

  router.get('/pacientes/:id', obtenerPaciente)

  router.post('/pacientes', nuevoCliente);

  router.put('/pacientes/:id', actualizarPaciente)

  router.delete('/pacientes/:id', eliminarPaciente)


  return router;
};
