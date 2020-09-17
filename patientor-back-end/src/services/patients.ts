import patients from '../../data/patients';

import { Patient, NonSensitivePatient, NewPatient } from '../types';

const getAll = (): Patient[] => {
  return patients;
};

const getAllNonSensitive = (): NonSensitivePatient[] =>
  patients.map(({ id, dateOfBirth, name, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

const addNew = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: patients.length.toString(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getAll,
  getAllNonSensitive,
  addNew,
};
