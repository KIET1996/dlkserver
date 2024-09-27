import medicalSpecialtyController from '../controllers/medicalSpecialty.controller.js';
import express from 'express';
const router = express.Router();

router.route('/getAll').get(medicalSpecialtyController.getAll);
router.route('/add').post(medicalSpecialtyController.add);
router.route('/update/:id').put(medicalSpecialtyController.update);
router.route('/delete/:id').delete(medicalSpecialtyController.delete);

export default router;