import React from 'react';
import Part from './Part';
import { CoursePart } from '../types';

const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
  return (
    <div>
      {parts.map((p, i) => (
        <Part part={p} />
      ))}
    </div>
  );
};

export default Content;
