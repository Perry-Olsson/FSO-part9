import { NewPatient, NewBaseEntry, NewEntry } from '../types';

import {
  parseName,
  parseDate,
  parseDateOfBirth,
  parseDescription,
  parseDiagnosesCodes,
  parseDischarge,
  parseEntries,
  parseGender,
  parseHealthCheckRating,
  parseSsn,
  parseSpecialist,
  parseSickLeave,
  parseOccupation,
} from './parsers';

export const toNewPatient = (object: any): NewPatient => {
  const newPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries),
  };

  return newPatient;
};

const createBaseEntry = (entry: any): NewBaseEntry => {
  const newEntry: NewBaseEntry = {
    date: parseDate(entry.date),
    specialist: parseSpecialist(entry.specialist),
    description: parseDescription(entry.description),
  };
  if (entry.diagnosisCodes)
    newEntry.diagnosisCodes = parseDiagnosesCodes(entry.diagnosisCodes);
  return newEntry;
};

export const toNewEntry = (entry: any): NewEntry => {
  switch (entry.type) {
    case 'Occupational Healthcare': {
      const newEntry: NewEntry = {
        type: entry.type,
        ...createBaseEntry(entry),
      };
      if (entry.sickLeave) newEntry.sickLeave = parseSickLeave(entry.sickLeave);
      return newEntry;
    }
    case 'Health Check': {
      const newEntry: NewEntry = {
        type: entry.type,
        ...createBaseEntry(entry),
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
      };
      return newEntry;
    }
    case 'Hospital': {
      const newEntry: NewEntry = {
        type: entry.type,
        ...createBaseEntry(entry),
        discharge: parseDischarge(entry.discharge),
      };
      return newEntry;
    }
    default:
      throw new Error(`Invalid entry type ${entry.type}`);
  }
};
