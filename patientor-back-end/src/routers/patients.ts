import express from 'express';
import patientsService from '../services/patients';

const router = express.Router();

router.get('/', (_, res) => {
  res.json(patientsService.getAllNonSensitive());
});

export default router;
