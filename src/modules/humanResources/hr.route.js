import { Router } from 'express';

import authenticateJWT from '../../middlewares/authJWT.js';
import HrController from './hr.controller.js';

const router = Router();
const hrController = HrController();

// GET list of all employees.
router.get('/', authenticateJWT, hrController.hr_list);

// GET detail for a specific employee.
router.get('/:id', authenticateJWT, hrController.hr_detail);

// POST Handle employee create.
router.post('/create', authenticateJWT, hrController.hr_create);

// PUT Handle employee update.
router.put('/update/:id', authenticateJWT, hrController.hr_update);

// DELETE Handle employee remove.
router.delete('/delete/:id', authenticateJWT, hrController.hr_delete);

export default router;
