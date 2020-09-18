import patients from '../../data/patients';
import { toNewPatient } from '../utils/validation';

import { Patient, PublicPatient, NewPatient } from '../types';

const getAll = (): Patient[] => {
  return patients;
};

const getAllPublic = (): PublicPatient[] =>
  patients.map(({ id, dateOfBirth, name, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

const getOne = (id: string): Patient => {
  const patient: Patient | undefined = patients.find(
    patient => patient.id === id
  );
  if (!patient) throw new Error('Patient was not found');
  return patient;
};

const addNew = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: patients.length.toString(),
    ...toNewPatient(patient),
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getAll,
  getAllPublic,
  getOne,
  addNew,
};
