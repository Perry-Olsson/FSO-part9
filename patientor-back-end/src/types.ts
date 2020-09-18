export interface Entry {}

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
