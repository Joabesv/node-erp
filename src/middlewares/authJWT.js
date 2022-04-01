import jwt from 'jsonwebtoken';
import 'dotenv/config';

import ApiResponse from '../helpers/apiResponses.js';

const accessTokenSecret = process.env.JWT_SECRET;
const apiResponse = ApiResponse();

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return apiResponse.unauthorizedResponse(res, 'Invalid credentials');
  }
  const token = authHeader.split(' ')[1];

  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      return apiResponse.unauthorizedResponse(res, 'Invalid credentials');
    }
    // if token is valid then add user details into req and continue
    req.user = user;
    next();
  });
};

export default authenticateJWT;
