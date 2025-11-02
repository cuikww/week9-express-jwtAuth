import { Router } from 'express';
import {
  getAllDosen,
  getDosenByNidn,
  updateDosen,
  deleteDosen,
} from '../controllers/dosenController.js';
import { validateDosen } from '../middleware/validator.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateToken); 

router.get('/', getAllDosen);
router.get('/:nidn', getDosenByNidn);
router.put('/:nidn', validateDosen, updateDosen);
router.delete('/:nidn', deleteDosen);

export default router;
