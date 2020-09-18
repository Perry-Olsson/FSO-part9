import React from 'react';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  const base = (
    <>
      <h3>{part.name}</h3>
      <p>exercises: {part.exerciseCount}</p>
    </>
  );
  switch (part.name) {
    case 'Deeper type usage':
      return (
        <div>
          {base}
          <p>description: {part.description}</p>
          <p>submission link: {part.exerciseSubmissionLink}</p>
        </div>
      );
    case 'Fundamentals':
      return (
        <div>
          {base}
          <p>description: {part.description}</p>
        </div>
      );
    case 'Using props to pass data':
      return (
        <div>
          {base}
          <p>group project count: {part.groupProjectCount}</p>
        </div>
      );
    case 'Refactoring Types':
      return (
        <div>
          {base}
          <p>description: {part.description}</p>
          <p>estimated time: {part.estimatedTime} hours</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
