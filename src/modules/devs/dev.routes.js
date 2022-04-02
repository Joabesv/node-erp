import { Router } from 'express';

import authenticateJWT from '../../middlewares/authJWT.js';
import DevController from './dev.controller.js';

const router = Router();

// Get list of all Devs
router.get('/', authenticateJWT, DevController.dev_list);

// Get list of an specific dev
router.get('/:id', authenticateJWT, DevController.dev_detail);

// POST create a dev
router.post('/create', authenticateJWT, DevController.dev_create);

// PUT update a dev
router.put('/update/:id', authenticateJWT, DevController.dev_update);

// DELETE a deb
router.delete('/delete/:id', authenticateJWT, DevController.dev_delete);

export default router;
