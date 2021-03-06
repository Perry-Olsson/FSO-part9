import express from 'express';
import patientsService from '../services/patients';

const router = express.Router();

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = patientsService.addEntry(req.params.id, req.body);
    res.json(newEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/:id', (req, res) => {
  try {
    res.json(patientsService.getOne(req.params.id));
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/', (_, res) => {
  res.json(patientsService.getAllPublic());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation, entries } = req.body;

  try {
    const newPatient = patientsService.addNew({
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
      entries,
    });

    res.json(newPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
