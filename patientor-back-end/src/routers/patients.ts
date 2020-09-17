import express from 'express';
import patientsService from '../services/patients';

const router = express.Router();

router.get('/', (_, res) => {
  res.json(patientsService.getAllNonSensitive());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  const newPatient = patientsService.addNew({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  res.json(newPatient);
});

export default router;
