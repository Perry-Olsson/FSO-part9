import { EntryFormValues } from '../AddEntryModal/AddEntryFrom';
import { NewEntry } from '../types';

const createBaseEntry = (
  values: EntryFormValues
): {
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes: string[];
} => {
  if (!Boolean(Date.parse(values.date)))
    throw new Error(`Invalid date format ${values.date}`);
  return {
    date: values.date,
    specialist: values.specialist,
    description: values.description,
    diagnosisCodes: values.diagnosisCodes,
  };
};

export const formatEntry = (values: EntryFormValues): NewEntry => {
  switch (values.type) {
    case 'Hospital': {
      if (!Boolean(Date.parse(values.dischargeDate)))
        throw new Error(`Invalid Discharge date ${values.dischargeDate}`);
      const entry: NewEntry = {
        type: 'Hospital',
        discharge: {
          date: values.dischargeDate,
          criteria: values.criteria,
        },
        ...createBaseEntry(values),
      };
      return entry;
    }
    case 'Occupational Healthcare': {
      const entry: NewEntry = {
        type: values.type,
        ...createBaseEntry(values),
      };
      if (values.sickLeave.startDate && values.sickLeave.endDate)
        entry.sickLeave = values.sickLeave;
      return entry;
    }
    case 'Health Check': {
      const entry: NewEntry = {
        type: values.type,
        healthCheckRating: values.healthCheckRating,
        ...createBaseEntry(values),
      };
      return entry;
    }
    default:
      throw new Error(`Invalid type ${values.type}`);
  }
};
