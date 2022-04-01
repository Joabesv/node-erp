import HrModel from './hr.model.js';
import ApiResponses from '../../helpers/apiResponses.js';
import mongoose from 'mongoose';

const apiResponse = ApiResponses();

export default function HumanResourcesController() {
  // GET list of all employees.
  function hr_list(req, res) {
    try {
      HrModel.find().then(hrs => {
        return apiResponse.successResponseWithData(res, 'Success', hrs);
      });
    } catch (err) {
      return apiResponse.errorResponse(res, err);
    }
  }

  // GET detail for a specific employee.
  function hr_detail(req, res) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return apiResponse.validationErrorWithData(
          res,
          'Invalid Error.',
          'Invalid ID'
        );
      }

      HrModel.findById(req.params.id).then(hrs => {
        if (hrs === null) {
          return apiResponse.notFoundResponse(res, 'Employee not Found');
        }
        return apiResponse.successResponseWithData(res, 'Success', hrs);
      });
    } catch (err) {
      return apiResponse.errorResponse(res, err);
    }
  }

  // POST Handle employee create.
  function hr_create(req, res) {
    try {
      const hrModel = new HrModel({
        emailId: req.body.emailId,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        phoneNumber: req.body.phoneNumber,
        city: req.body.city,
        state: req.body.state,
      });

      hrModel.save(function (err) {
        if (err) {
          return apiResponse.errorResponse(res, err);
        }
        return apiResponse.successResponseWithData(
          res,
          'employee added successfully',
          hrModel._id
        );
      });
    } catch (err) {
      return apiResponse.errorResponse(res, err);
    }
  }

  // PUT Handle employee update.
  function hr_update(req, res) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return apiResponse.validationErrorWithData(
          res,
          'Invalid Error.',
          'Invalid ID'
        );
      }

      const hrModel = new HrModel({
        _id: req.params.id,
        emailId: req.body.emailId,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        phoneNumber: req.body.phoneNumber,
        city: req.body.city,
        state: req.body.state,
      });

      HrModel.findByIdAndUpdate(req.params.id, hrModel, {}, err => {
        if (err) {
          return apiResponse.errorResponse(res, err);
        }
        return apiResponse.successResponseWithData(
          res,
          'employee updated successfully',
          req.params.id
        );
      });
    } catch (err) {
      return apiResponse.errorResponse(res, err);
    }
  }

  // DELETE Handle employee remove.
  function hr_delete(req, res) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return apiResponse.validationErrorWithData(
          res,
          'Invalid Error.',
          'Invalid ID'
        );
      }

      HrModel.findByIdAndRemove(req.params.id, err => {
        if (err) {
          return apiResponse.errorResponse(res, err);
        }
        return apiResponse.successResponseWithData(
          res,
          'Employee removed successfully',
          req.params.id
        );
      });
    } catch (err) {
      return apiResponse.errorResponse(res, err);
    }
  }

  return {
    hr_list,
    hr_detail,
    hr_create,
    hr_update,
    hr_delete,
  };
}
