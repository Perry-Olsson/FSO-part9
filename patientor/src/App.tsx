import React from 'react';
import axios from 'axios';
import { Route, Link, Switch, useRouteMatch } from 'react-router-dom';
import { Button, Divider, Header, Container } from 'semantic-ui-react';

import { apiBaseUrl } from './constants';
import { useStateValue, setPatientList, setDiagnoses } from './state';
import { Patient, Diagnosis } from './types';

import PatientListPage from './PatientListPage';
import PatientPage from './PatientPage';

const App: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    const fetchDiagnosesList = async () => {
      try {
        const { data: diagnoses } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnoses(diagnoses));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
    fetchDiagnosesList();
  }, [dispatch]);

  const match = useRouteMatch<{ id: string }>('/patient/:id');

  return (
    <div className="App">
      <Container>
        <Header as="h1">Patientor</Header>
        <Button as={Link} to="/" primary>
          Home
        </Button>
        <Divider hidden />
        <Switch>
          {match && patients[match.params.id] && (
            <Route path="/patient/:id" render={() => <PatientPage />} />
          )}
          {!match && <Route path="/" render={() => <PatientListPage />} />}
        </Switch>
      </Container>
    </div>
  );
};

export default App;
