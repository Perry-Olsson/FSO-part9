import React from 'react';
import { HospitalEntry } from '../../types';
import '../index.css';

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <div>
      <b>Discharge: </b>
      <div>
        <p className="indent">date: {entry.discharge.date}</p>
        <p className="indent">criteria: {entry.discharge.criteria}</p>
      </div>
    </div>
  );
};

export default Hospital;
