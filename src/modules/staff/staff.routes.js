import { Router } from 'express';
import authenticateJWT from '../../middlewares/authJWT.js';
import StaffController from './staff.controller.js';

const router = Router();
const staffController = StaffController();

// GET list of all staffs.
router.get('/', authenticateJWT, staffController.staff_list);

// GET detail for a specific staff.
router.get('/:id', authenticateJWT, staffController.staff_detail);

// POST Handle staff create.
router.post('/create', authenticateJWT, staffController.staff_create);

// PUT Handle staff update.
router.put('/update/:id', authenticateJWT, staffController.staff_update);

// DELETE Handle staff remove.
router.delete('/delete/:id', authenticateJWT, staffController.staff_delete);

export default router;
