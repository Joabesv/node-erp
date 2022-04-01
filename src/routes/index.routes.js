import { Router } from 'express';
import ApiResponse from '../helpers/apiResponses.js';

const apiResponse = ApiResponse();

const router = Router();

router.get('/', (req, res) => {
  return apiResponse.successResponse(res, 'ERP backend challenge');
});

export default router;
