interface Vitals {
  height: number;
  weight: number;
}

export const parseArgs = (height: string, weight: string): Vitals => {
  if (!isNaN(Number(height)) && !isNaN(Number(height)))
    return {
      height: Number(height),
      weight: Number(weight),
    };
  else throw new Error('Provided values were not numbers');
};

const calculateBMI = (h: number, w: number): number => {
  return (w / h ** 2) * 703;
};

const getBMI = (vitals: Vitals): string => {
  const BMI: number = calculateBMI(vitals.height, vitals.weight);

  const message = (classification: string): string =>
    `Your BMI of ${BMI} is classified as ${classification}`;

  if (BMI < 18.5) return message('underweight');
  else if (BMI < 25) return message('normal weight');
  else if (BMI < 30) return message('overweight');
  else return message('obese');
};

export default getBMI;
