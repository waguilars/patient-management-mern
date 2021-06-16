import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from '../config/axios';
import Swal from 'sweetalert2';

const Cita = (props) => {
  const setConsulta = props.setConsulta;
  const [cita, setCita] = useState(props.cita);

  if (!cita) {
    const id = props.match.params.id;
    axios
      .get(`/pacientes/${id}`)
      .then((resp) => {
        console.log(resp.data);
        if (!resp.data.paciente) {
          props.history.push('/');
          return;
        }
        setCita(resp.data.paciente);
      })
      .catch((err) => {
        props.history.push('/');
      });
  }

  const eliminarCita = (id) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Una cita eliminada no se puede recuperar.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Eliminado', 'La cita ha sido eliminada', 'success');

        axios.delete(`/pacientes/${id}`).then((resp) => {
          props.history.push('/');
          setConsulta(true);
        });
      }
    });
  };

  return (
    <>
      <h1> Nombre cita: {cita?.nombre} </h1>
      <div className="container mt-5 py-5">
        <div className="row">
          <div className="col-12 mb-5 d-flex justify-content-center">
            <Link
              to="/"
              className="btn btn-success text-uppercase py-2 px-5 font-weight-bold"
            >
              Volver
            </Link>
          </div>

          <div className="col-md-8 mx-auto">
            <div className="list-group">
              <div className="p-5 list-group-item list-group-action flex-column align-items-center">
                <div className="d-flex w-100 justify-content-between mb-4">
                  <h3 className="mb-3">{cita?.nombre}</h3>
                  <small className="fecha-alta">
                    {cita?.fecha} - {cita?.hora}
                  </small>
                </div>

                <p className="mb-0">{cita?.sintomas}</p>
                <div className="contacto py-3">
                  <p> Dueño: {cita?.propietario}</p>
                  <p> Telefono: {cita?.telefono}</p>
                </div>

                <div className="d-flex">
                  <button
                    type="button"
                    className="text-uppercase py-2 px-5 font-weight-bold btn btn-danger col"
                    onClick={() => eliminarCita(cita._id)}
                  >
                    Eliminar &times;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Cita);
