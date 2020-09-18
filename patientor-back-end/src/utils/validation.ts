import { NewPatient, Gender } from '../types';

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Missing of invalid name: ${name}`);
  }
  return name;
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseDateOfBirth = (dob: any): string => {
  if (!dob || !isString(dob) || !isDate(dob))
    throw new Error(`Missing or invalid date of birth: ${dob}`);

  return dob;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) throw new Error(`Missin or invalid ssn: ${ssn}`);

  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender))
    throw new Error(`Missing or invalid gender: ${gender}`);

  return gender;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseOccupation = (occ: any): string => {
  if (!occ || !isString(occ))
    throw new Error(`Missing or invalid occupation: ${occ}`);

  return occ;
};

export const toNewPatient = (object: any): NewPatient => {
  const newEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: object.entries,
  };

  return newEntry;
};
