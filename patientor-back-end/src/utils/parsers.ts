import {
  Gender,
  Entry,
  EntryTypes,
  SickLeave,
  HealthCheckRating,
  Discharge,
} from '../types';

import diagnoses from '../../data/diagnoses';

export const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Missing of invalid name: ${name}`);
  }
  return name;
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (text: number): boolean => {
  if (isNaN(text) || !Number.isInteger(text)) return false;
  return true;
};

export const parseDateOfBirth = (dob: any): string => {
  if (!dob || !isString(dob) || !isDate(dob))
    throw new Error(`Missing or invalid date of birth: ${dob}`);

  return dob;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) throw new Error(`Missin or invalid ssn: ${ssn}`);

  return ssn;
};

export const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender))
    throw new Error(`Missing or invalid gender: ${gender}`);

  return gender;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export const parseOccupation = (occ: any): string => {
  if (!occ || !isString(occ))
    throw new Error(`Missing or invalid occupation: ${occ}`);

  return occ;
};

export const parseEntries = (entries: any): Entry[] => {
  if (!Array.isArray(entries)) throw new Error('Invalid entry format');
  const entryTypes = Object.values(EntryTypes);
  entries.forEach((ent: any) => {
    if (!entryTypes.includes(ent.type))
      throw new Error(`Invalid entry type ${ent.type}`);
  });
  return entries;
};

export const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date))
    throw new Error(`Invalid date ${date}`);
  return date;
};

export const parseSpecialist = (spec: any): string => {
  if (!spec || !isString(spec)) throw new Error(`Invalid specialist ${spec}`);
  return spec;
};

export const parseDescription = (desc: any): string => {
  if (!desc || !isString(desc))
    throw new Error(`Invalid or missing description ${desc}`);
  return desc;
};

export const parseDiagnosesCodes = (codes: any): string[] => {
  if (!Array.isArray(codes))
    throw new Error(`Invalid diagnoses codes format ${codes}`);
  codes.forEach(code => {
    if (!isString(code) || !diagnoses.find(d => code === d.code))
      throw new Error(`Invalid diagnoses code ${code}`);
  });
  return codes;
};

export const parseSickLeave = (sL: any): SickLeave => {
  if (!sL || typeof sL !== 'object')
    throw new Error(`Invalid or missing sick leave info ${sL}`);
  if (!sL.hasOwnProperty('startDate') || !sL.hasOwnProperty('endDate'))
    throw new Error(`Missing date information for sick leave ${sL}`);
  if (!isString(sL.startDate) || !isDate(sL.startDate))
    throw new Error(`Invalid start date ${sL.startDate}`);
  if (!isString(sL.endDate) || !isDate(sL.endDate))
    throw new Error(`Invalid end date ${sL.endDate}`);
  return sL;
};

export const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  rating = Number(rating);
  if (!rating || !isNumber(rating))
    throw new Error(`Invalid health check rating ${rating}`);
  if (rating < 0 || rating > 3)
    throw new Error(`health check rating ${rating} is out of range`);
  return rating;
};

export const parseDischarge = (dC: any): Discharge => {
  if (!dC || typeof dC !== 'object')
    throw new Error(`Missing or malformated discharge ${dC}`);
  if (!dC.hasOwnProperty('date') || !dC.hasOwnProperty('criteria'))
    throw new Error(`Missing information for discharge ${dC}`);
  if (!isString(dC.date) || !isDate(dC.date))
    throw new Error(`Invalid date for discharge ${dC.date}`);
  if (!isString(dC.criteria))
    throw new Error(`Invalid criteria from ${dC.criteria}`);
  return dC;
};
