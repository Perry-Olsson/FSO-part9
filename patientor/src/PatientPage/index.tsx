import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { useStateValue, setUpdatedPatient, setAddEntry } from '../state';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import PatientField from './PatientField';
import AddEntryModal from '../AddEntryModal';
import { Button } from 'semantic-ui-react';
import { formatEntry } from '../utils/entryHelper';
import { EntryFormValues } from '../AddEntryModal/AddEntryFrom';
import './index.css';

const hasBeenFetched = (patient: Patient): boolean => {
  if (!patient.entries || !patient.ssn) return false;
  return true;
};

const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const { id } = useParams<{ id: string }>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: fromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setUpdatedPatient(fromApi));
      } catch (e) {
        console.log(e.message);
      }
    };
    if (!hasBeenFetched(patients[id])) fetchPatient();
  });

  const submitEntry = async (values: EntryFormValues) => {
    try {
      const { data: entry } = await axios.post(
        `${apiBaseUrl}/patients/${id}/entries`,
        formatEntry(values)
      );
      dispatch(setAddEntry(entry, id));
      closeModal();
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <div>
      <PatientField patient={patients[id]} />
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitEntry}
        error={error}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientPage;
