interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosesCodes?: Array<Diagnosis['code']>;
}

export enum EntryTypes {
  OccupationalHealthCare = 'Occupational Healthcare',
  HealthCheck = 'Health Check',
  Hospital = 'Hospital',
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryTypes.HealthCheck;
  healthCheckRating: HealthCheckEntry;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: EntryTypes.OccupationalHealthCare;
  sickLeave?: SickLeave;
}

interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: EntryTypes.Hospital;
  discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other',
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
