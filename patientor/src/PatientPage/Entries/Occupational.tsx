import React from 'react';
import { OccupationalHealthCareEntry } from '../../types';

const Occupational: React.FC<{ entry: OccupationalHealthCareEntry }> = ({
  entry,
}) => {
  return (
    <div>
      <b>sick leave: </b>
      {entry.sickLeave ? (
        <>
          <div>start date: {entry.sickLeave.startDate}</div>
          <p>end date: {entry.sickLeave.endDate}</p>
        </>
      ) : (
        <>none</>
      )}
    </div>
  );
};

export default Occupational;
