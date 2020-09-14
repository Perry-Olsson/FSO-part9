import patients from '../../data/patients';

import { Patient, NonSensitivePatient } from '../types';

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

export default {
  getAll,
  getAllNonSensitive,
};
