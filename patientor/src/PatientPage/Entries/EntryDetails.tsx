import React from 'react';
import { Entry } from '../../types';
import Hospital from './Hospital';
import Occupational from './Occupational';
import HealthCheck from './HealthCheck';
import BaseEntry from './BaseEntry';
import { Icon } from 'semantic-ui-react';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated Union Member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case 'Hospital':
      return (
        <BaseEntry entry={entry}>
          <Icon name="hospital" size="big" />
          <Hospital entry={entry} />;
        </BaseEntry>
      );
    case 'Occupational Healthcare':
      return (
        <BaseEntry entry={entry}>
          <Icon name="stethoscope" size="big" />
          <Occupational entry={entry} />
        </BaseEntry>
      );
    case 'Health Check':
      return (
        <BaseEntry entry={entry}>
          <Icon name="doctor" size="big" />
          <HealthCheck entry={entry} />
        </BaseEntry>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
