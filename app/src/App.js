import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import axios from './config/axios';

import Cita from './components/Cita';
import NuevaCita from './components/NuevaCita';
import Pacientes from './components/Pacientes';

function App() {
  const [citas, setCitas] = useState([]);
  const [consulta, setConsulta] = useState(true);
  useEffect(() => {
    if (consulta) {
      const consultarAPI = () => {
        axios
          .get('/pacientes')
          .then((resp) => {
            const citas = resp.data.pacientes;
            setCitas(citas.reverse());

            setConsulta(false);
          })
          .catch((err) => console.log(err));
      };

      consultarAPI();
    }
  }, [consulta]);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Pacientes citas={citas} />} />
        <Route
          exact
          path="/nueva"
          component={() => <NuevaCita setConsulta={setConsulta} />}
        />
        <Route
          exact
          path="/cita/:id"
          render={(props) => {
            const cita = citas.find(
              (cita) => cita._id === props.match.params.id
            );
            return <Cita cita={cita} setConsulta={setConsulta} />;
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
