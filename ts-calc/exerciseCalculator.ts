// import readline from 'readline';

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// const targetAndHours: Array<number> = [];

// rl.question('Enter daily exercise target: ', (num: string) => {
//   targetAndHours.push(Number(num));
//   rl.question(
//     'Enter daily hours with spaces between each day: ',
//     (numbers: string) => {
//       numbers
//         .replace(/[^.\d]+/gm, ' ')
//         .split(' ')
//         .filter((num: string) => num.match(/\d+/gm))
//         .forEach((num: string) => targetAndHours.push(Number(num)));
//       const report = getAverageExerciseHours(targetAndHours);
//       for (const [key, value] of Object.entries(report)) {
//         console.log(`${key}: `, value);
//       }
//       rl.close();
//     }
//   );
// });

interface exerciseReport {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const getAverageExerciseHours = (
  target: number,
  hours: Array<number>
): exerciseReport => {
  const average = Number(
    hours
      .reduce((total, cur, i) =>
        i === hours.length - 1 ? (total + cur) / hours.length : (total += cur)
      )
      .toFixed(2)
  );

  let rating: number = Math.round(target + (average - target));
  rating = rating < 0 ? 0 : rating > 3 ? 3 : rating;

  let ratingDescription;
  switch (rating) {
    case 0:
      ratingDescription = 'Were you on vacation this week?';
      break;
    case 1:
      ratingDescription = 'Need to do better next week';
      break;
    case 2:
      ratingDescription =
        average >= target
          ? 'Good job you hit your goal!'
          : 'Not bad but not quite at your goal';
      break;
    case 3:
      ratingDescription = 'You killed it this week';
      break;
    default:
      throw new Error("Something went wrong :'(");
  }

  return {
    periodLength: hours.length,
    trainingDays: hours.reduce((acc, cur) => {
      if (cur !== 0) return acc + 1;
      return acc;
    }, 0),
    success: average >= target,
    rating: rating > 3 ? 3 : rating,
    ratingDescription,
    target,
    average,
  };
};

export default getAverageExerciseHours;
