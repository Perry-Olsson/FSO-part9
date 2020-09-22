import React from 'react';
import { useStateValue } from '../state';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import {
  SelectFieldOption,
  SelectField,
  TextField,
  DiagnosisSelection,
  TypeSpecificFields,
} from '../AddPatientModal/FormField';
import { EntryTypes, Diagnosis, SickLeave, HealthCheckRating } from '../types';

const entryOptions: SelectFieldOption[] = [
  {
    value: EntryTypes.OccupationalHealthCare,
    label: 'Occupational Healthcare',
  },
  { value: EntryTypes.HealthCheck, label: 'Health Check' },
  { value: EntryTypes.Hospital, label: 'Hospital' },
];

export type EntryFormValues = {
  type: EntryTypes;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes: Array<Diagnosis['code']>;
  healthCheckRating: HealthCheckRating;
  sickLeave: SickLeave;
  dischargeDate: string;
  criteria: string;
};

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: EntryTypes.Hospital,
        date: '',
        specialist: '',
        description: '',
        diagnosisCodes: [],
        healthCheckRating: 0,
        sickLeave: {
          startDate: '',
          endDate: '',
        },
        dischargeDate: '',
        criteria: '',
      }}
      validate={values => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (values.type === 'Hospital') {
          if (!values.dischargeDate) errors.dischargeDate = requiredError;
        }
        if (values.type === 'Hospital' && !values.criteria) {
          errors.criteria = requiredError;
        }
        return errors;
      }}
      onSubmit={onSubmit}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField label="Type" name="type" options={entryOptions} />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <TypeSpecificFields type={values.type} />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
