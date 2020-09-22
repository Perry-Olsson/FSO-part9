import React from 'react';
import {
  ErrorMessage,
  Field,
  FieldProps,
  FormikProps,
  useFormikContext,
} from 'formik';
import { Dropdown, DropdownProps, Form, Grid } from 'semantic-ui-react';
import { Diagnosis, EntryTypes, Gender } from '../types';
import { EntryFormValues } from '../AddEntryModal/AddEntryFrom';

// structure of a single option
export type SelectFieldOption = {
  value: Gender | EntryTypes;
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: SelectFieldOption[];
};

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
}: SelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder,
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField: React.FC<NumberProps> = ({
  field,
  label,
  min,
  max,
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type="number" min={min} max={max} />

    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>['setFieldValue'];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>['setFieldTouched'];
}) => {
  const field = 'diagnosisCodes';
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map(diagnosis => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code,
  }));

  return (
    <Form.Field>
      <label>Diagnoses</label>
      <Dropdown
        fluid
        multiple
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};

export const TypeSpecificFields: React.FC<{
  type: EntryTypes;
}> = ({ type }) => {
  switch (type) {
    case 'Health Check':
      return (
        <Field
          label="Health Check Rating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />
      );
    case 'Occupational Healthcare':
      return (
        <DoubleTextField
          title="Sick Leave"
          names={['sickLeave.startDate', 'sickLeave.endDate']}
          labels={['Start', 'End']}
          placeholders={['start date', 'end date']}
        />
      );
    case 'Hospital': {
      return (
        <DoubleTextField
          title="Discharge"
          names={['dischargeDate', 'criteria']}
          labels={['Date', 'Criteria']}
          placeholders={['date', 'criteria']}
        />
      );
    }
    default:
      return <div>oops</div>;
  }
};

const DoubleTextField: React.FC<DoubleTFProps> = ({
  title,
  names,
  labels,
  placeholders,
}) => {
  return (
    <Form.Field>
      <label style={{ marginBottom: '0.5em' }}>{title}</label>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Field
              name={names[0]}
              label={labels[0]}
              placeholder={placeholders[0]}
              component={Fields}
            />
          </Grid.Column>
          <Grid.Column>
            <Field
              name={names[1]}
              label={labels[1]}
              placeholder={placeholders[1]}
              component={Fields}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form.Field>
  );
};

export const Fields: React.FC<TextProps> = ({ field, label, placeholder }) => {
  const { values } = useFormikContext<EntryFormValues>();
  return (
    <Form.Field>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <label style={{ marginRight: '2em' }}>{label}: </label>
        <Field placeholder={placeholder} {...field} />
      </div>
      <div style={{ color: 'red' }}>
        {values.type === 'Hospital' && <ErrorMessage name={field.name} />}
      </div>
    </Form.Field>
  );
};

interface DoubleTFProps {
  title: string;
  labels: string[];
  placeholders: string[];
  names: string[];
}
