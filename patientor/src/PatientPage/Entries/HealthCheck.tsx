import React from 'react';
import HealthRatingBar from '../../components/HealthRatingBar';
import { HealthCheckEntry } from '../../types';

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <HealthRatingBar
      rating={Number(entry.healthCheckRating)}
      showText={false}
    />
  );
};

export default HealthCheck;
