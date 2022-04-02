import jwt from 'jsonwebtoken';
import 'dotenv/config';

import ApiResponse from '../../helpers/apiResponses.js';
import Staff from '../staff/staff.model.js';
import HrModel from '../humanResources/hr.model.js';
import DevModel from '../devs/dev.model.js';

const apiResponse = ApiResponse();
const accessTokenSecret = process.env.JWT_SECRET;

export default function login(req, res) {
  try {
    const userType = req.body.userType;
    /**
     * User type 1 is for staff, 2 is for HR, 3 is for Devs
     */
    if (userType === 1) {
      Staff.findOne({
        emailId: req.body.userName,
        password: req.body.password,
      }).then(staff => {
        if (!staff) {
          return apiResponse.errorResponse(res, 'User not found', {});
        }
        const accessToken = jwt.sign(
          { username: staff.emailId, userId: staff._id, isHr: false },
          accessTokenSecret,
          { expiresIn: '10h' }
        );
        return apiResponse.successResponseWithData(
          res,
          'Login Successfully',
          accessToken
        );
      });
    }

    if (userType === 2) {
      HrModel.findOne({
        emailId: req.body.userName,
        password: req.body.password,
      }).then(hrs => {
        if (!hrs) {
          return apiResponse.errorResponse(res, 'User not found', {});
        }
        const accessToken = jwt.sign(
          { username: hrs.emailId, userId: hrs._id, isHr: true },
          accessTokenSecret,
          { expiresIn: '10h' }
        );
        return apiResponse.successResponseWithData(
          res,
          'Login Successfully',
          accessToken
        );
      });
    }

    if (userType === 3) {
      DevModel.findOne({
        emailId: req.body.userName,
        password: req.body.password,
      }).then(devs => {
        if (!devs) {
          return apiResponse.errorResponse(res, 'User not found', {});
        }
        const accessToken = jwt.sign(
          { username: devs.emailId, userId: devs._id, isHr: false },
          accessTokenSecret,
          { expiresIn: '10h' }
        );

        return apiResponse.successResponseWithData(
          res,
          'Login Successfully',
          accessToken
        );
      });
    }

    if (!userType) {
      return apiResponse.validationErrorWithData(res, 'Usertype not found', {});
    }
  } catch (err) {
    return apiResponse.errorResponse(res, err);
  }
}
