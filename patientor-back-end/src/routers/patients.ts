import express from 'express';
import patientsService from '../services/patients';

const router = express.Router();

router.get('/', (_, res) => {
  res.json(patientsService.getAllNonSensitive());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  try {
    const newPatient = patientsService.addNew({
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
    });

    res.json(newPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
