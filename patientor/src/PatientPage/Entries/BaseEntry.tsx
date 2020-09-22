import React, { useState } from 'react';
import { useStateValue } from '../../state';
import { Entry } from '../../types';

const BaseEntry: React.FC<{
  children: Array<any | React.FC>;
  entry: Entry;
}> = ({ children, entry }) => {
  const [{ diagnoses }] = useStateValue();
  const [expand, setExpand] = useState(false);
  return (
    <div
      onClick={() => setExpand(!expand)}
      style={{
        border: 'solid 1px',
        borderRadius: '4px',
        margin: '1em',
        padding: '1em',
        cursor: 'pointer',
      }}
    >
      <h3>
        {entry.date}
        <span style={{ marginLeft: '0.5em' }}>{children[0]}</span>
      </h3>
      {entry.diagnosisCodes && (
        <div>
          <h5>Diagnoses</h5>
          {entry.diagnosisCodes.map((code, i) => (
            <li key={i}>{diagnoses[code].name}</li>
          ))}
        </div>
      )}
      <p style={{ color: 'gray', marginTop: '1em' }}>{entry.description}</p>
      {expand && (
        <div>
          <p>
            <b>Specialist: </b>
            {entry.specialist}
          </p>
          {children[1]}
        </div>
      )}
    </div>
  );
};

export default BaseEntry;
