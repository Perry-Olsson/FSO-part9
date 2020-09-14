import express from 'express';
import getBMI, { parseArgs } from './bmiCalculator';
import getExerciseReport from './exerciseCalculator';

interface weeklyExercise {
  target: number;
  hours: Array<number>;
}

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi/:height?/:weight?', (req, res) => {
  const vitals = parseArgs(
    req.query.height as string,
    req.query.weight as string
  );
  res.json({ ...vitals, bmi: getBMI(vitals) });
});

app.get('/bmi', (_req, res) => {
  res.send('provide height and weight params');
});

app.post('/exercise', (req, res) => {
  try {
    const validate = (body: any): weeklyExercise => {
      const target = !isNaN(Number(body.target)) ? body.target : null;
      const hours = typeof body.hours === 'object' ? body.hours : null;
      if (hours) {
        if (!hours.length) throw new Error('No hours provided');
        for (let hour of hours) {
          if (typeof hour !== 'number')
            throw new Error('must provide valid integers for hours');
        }
      }
      return {
        target,
        hours,
      };
    };
    const { target, hours } = validate(req.body);
    if (!target || !hours)
      return res
        .status(400)
        .json({ error: 'malFormatted or missing parameters' });
    return res.json(getExerciseReport(target, hours));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
