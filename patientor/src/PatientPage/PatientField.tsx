import React from 'react';
import { Patient } from '../types';
import StaticInfo from './StaticInfo';
import EntryDetails from './Entries/EntryDetails';

const PatientField: React.FC<{
  patient: Patient;
}> = ({ patient }) => {
  return (
    <div>
      <StaticInfo patient={patient} />
      <div>
        <h3>entries</h3>
        {patient.entries &&
          patient.entries.map(entry => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
      </div>
    </div>
  );
};

export default PatientField;
