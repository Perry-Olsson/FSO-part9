interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CPWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CPWithDescription {
  name: 'Fundamentals';
  description: string;
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CPWithDescription {
  name: 'Deeper type usage';
  description: string;
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CPWithDescription {
  name: 'Refactoring Types';
  estimatedTime: number;
}

export type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;
