import React from 'react';
import { Patient } from '../types';
import GenderIcon from '../components/Gender';

const StaticInfo: React.FC<{ patient: Patient }> = ({ patient }) => {
  return (
    <div>
      <h2>
        {patient.name}
        <span>
          {' '}
          <GenderIcon gender={patient.gender} />
        </span>
      </h2>

      {patient.dateOfBirth && (
        <p>
          <b>date of birth: </b>
          {patient.dateOfBirth}
        </p>
      )}
      <p>
        <b>ssn: </b>
        {patient.ssn}
      </p>
      <p>
        <b>occupation: </b>
        {patient.occupation}
      </p>
      <br />
    </div>
  );
};

export default StaticInfo;
