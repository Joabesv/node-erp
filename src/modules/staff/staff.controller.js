import Staff from './staff.model.js';
import ApiResponses from '../../helpers/apiResponses.js';
import mongoose from 'mongoose';

const apiResponse = ApiResponses();

export default function StaffController() {
  // GET para todos os membros da staff.
  function staff_list(req, res) {
    try {
      Staff.find().then(staffs => {
        return apiResponse.successResponseWithData(res, 'Success', staffs);
      });
    } catch (err) {
      return apiResponse.errorResponse(res, err);
    }
  }

  // GET para um membro especifico pelo id.
  function staff_detail(req, res) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return apiResponse.validationErrorWithData(
          res,
          'Invalid Error.',
          'Invalid ID'
        );
      }

      Staff.findById(req.params.id).then(staff => {
        if (staff === null) {
          return apiResponse.notFoundResponse(res, 'Staff not Found');
        }
        return apiResponse.successResponseWithData(res, 'Success', staff);
      });
    } catch (err) {
      return apiResponse.errorResponse(res, err);
    }
  }

  // POST para criar um membro da staff.
  function staff_create(req, res) {
    try {
      const staff = new Staff({
        emailId: req.body.emailId,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        phoneNumber: req.body.phoneNumber,
        city: req.body.city,
        state: req.body.state,
        designation: req.body.designation,
      });

      staff.save(err => {
        if (err) {
          return apiResponse.errorResponse(res, err);
        }
        return apiResponse.successResponseWithData(
          res,
          'Staff added successfully',
          staff._id
        );
      });
    } catch (err) {
      return apiResponse.errorResponse(res, err);
    }
  }

  // PUT para editar um membro especifico da staff.
  function staff_update(req, res) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return apiResponse.validationErrorWithData(
          res,
          'Invalid Error.',
          'Invalid ID'
        );
      }

      const staff = new Staff({
        _id: req.params.id,
        emailId: req.body.emailId,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        phoneNumber: req.body.phoneNumber,
        city: req.body.city,
        state: req.body.state,
        designation: req.body.designation,
      });

      Staff.findByIdAndUpdate(req.params.id, staff, {}, err => {
        if (err) {
          return apiResponse.errorResponse(res, err);
        }
        return apiResponse.successResponseWithData(
          res,
          'Staff updated successfully',
          req.params.id
        );
      });
    } catch (err) {
      return apiResponse.errorResponse(res, err);
    }
  }

  // DELETE para remover membro da staff.
  function staff_delete(req, res) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return apiResponse.validationErrorWithData(
          res,
          'Invalid Error.',
          'Invalid ID'
        );
      }

      Staff.findByIdAndRemove(req.params.id, err => {
        if (err) {
          return apiResponse.errorResponse(res, err);
        }
        return apiResponse.successResponseWithData(
          res,
          'Staff removed successfully',
          req.params.id
        );
      });
    } catch (err) {
      return apiResponse.errorResponse(res, err);
    }
  }

  return {
    staff_list,
    staff_detail,
    staff_create,
    staff_update,
    staff_delete,
  };
}
