import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Gender } from '../types';

const GenderIcon: React.FC<{ gender: Gender }> = ({ gender }) => {
  switch (gender) {
    case 'male':
      return <Icon name="mars" />;
    case 'female':
      return <Icon name="venus" />;
    case 'other':
      return <Icon name="genderless" />;
    default:
      return <p>gender missing</p>;
  }
};

export default GenderIcon;
