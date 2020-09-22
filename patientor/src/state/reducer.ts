import { State } from './state';
import { Diagnosis, Entry, Patient } from '../types';

type SetPatientList = {
  type: 'SET_PATIENT_LIST';
  payload: Patient[];
};

type AddPatient = {
  type: 'ADD_PATIENT';
  payload: Patient;
};

type UpdatePatient = {
  type: 'UPDATE_PATIENT';
  payload: Patient;
};

type SetDiagnoses = {
  type: 'SET_DIAGNOSES';
  payload: Diagnosis[];
};

type AddEntry = {
  type: 'ADD_ENTRY';
  payload: {
    entry: Entry;
    patientId: string;
  };
};

export type Action =
  | SetPatientList
  | AddPatient
  | UpdatePatient
  | SetDiagnoses
  | AddEntry;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_DIAGNOSES': {
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses,
        },
      };
    }
    case 'ADD_ENTRY': {
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.patientId]: {
            ...state.patients[action.payload.patientId],
            entries: [
              ...state.patients[action.payload.patientId].entries,
              action.payload.entry,
            ],
          },
        },
      };
    }
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): SetPatientList => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patients,
  };
};

export const setAddedPatient = (patient: Patient): AddPatient => {
  return {
    type: 'ADD_PATIENT',
    payload: patient,
  };
};

export const setUpdatedPatient = (patient: Patient): UpdatePatient => {
  return {
    type: 'UPDATE_PATIENT',
    payload: patient,
  };
};

export const setDiagnoses = (diagnoses: Diagnosis[]): SetDiagnoses => {
  return {
    type: 'SET_DIAGNOSES',
    payload: diagnoses,
  };
};

export const setAddEntry = (entry: Entry, patientId: string): AddEntry => {
  return {
    type: 'ADD_ENTRY',
    payload: {
      entry,
      patientId,
    },
  };
};
