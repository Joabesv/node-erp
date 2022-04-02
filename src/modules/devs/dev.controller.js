import DevModel from './dev.model.js';
import ApiResponses from '../../helpers/apiResponses.js';
import mongoose from 'mongoose';

const apiResponse = ApiResponses();

const DevController = (() => {
  // get list of all devs
  // method: GET
  function dev_list(req, res) {
    try {
      DevModel.find().then(devs => {
        return apiResponse.successResponseWithData(res, 'Success', devs);
      });
    } catch (err) {
      return apiResponse.errorResponse(res, err);
    }
  }

  // get detail of one dev
  // method: GET
  function dev_detail(req, res) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return apiResponse.validationErrorWithData(
          res,
          'Invalid Error.',
          'Invalid ID'
        );
      }

      DevModel.findById(req.params.id).then(dev => {
        if (dev === null) {
          return apiResponse.notFoundResponse(res, 'Dev Not Found');
        }

        return apiResponse.successResponseWithData(res, 'Success', dev);
      });
    } catch (err) {
      return apiResponse.errorResponse(res, err);
    }
  }

  // create one dev
  // method: POST
  function dev_create(req, res) {
    try {
      const devModel = new DevModel({
        emailId: req.body.emailId,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        phoneNumber: req.body.phoneNumber,
        city: req.body.city,
        state: req.body.state,
      });

      devModel.save(err => {
        if (err) {
          return apiResponse.errorResponse(res, err);
        }

        return apiResponse.successResponseWithData(
          res,
          'Dev added successfully',
          devModel._id
        );
      });
    } catch (err) {
      return apiResponse.errorResponse(res, err);
    }
  }

  // update one dev
  // method: PUT
  function dev_update(req, res) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return apiResponse.validationErrorWithData(
          res,
          'Invalid Error.',
          'Invalid ID'
        );
      }

      const devModel = new DevModel({
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

      DevModel.findByIdAndUpdate(req.params.id, devModel, {}, err => {
        if (err) {
          return apiResponse.errorResponse(res, err);
        }
        return apiResponse.successResponseWithData(
          res,
          'Developer updated successfully',
          req.params.id
        );
      });
    } catch (err) {
      return apiResponse.errorResponse(res, err);
    }
  }

  // delete one dev
  // method: DELETE
  function dev_delete(req, res) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return apiResponse.validationErrorWithData(
          res,
          'Invalid Error.',
          'Invalid ID'
        );
      }

      DevModel.findByIdAndRemove(req.params.id, err => {
        if (err) {
          return apiResponse.errorResponse(res, err);
        }
        return apiResponse.successResponseWithData(
          res,
          'Developer removed successfully',
          req.params.id
        );
      });
    } catch (err) {
      return apiResponse.errorResponse(res, err);
    }
  }

  return { dev_list, dev_detail, dev_create, dev_update, dev_delete };
})();

export default DevController;
