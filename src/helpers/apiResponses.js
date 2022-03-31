export default function ApiResponses() {
  function successResponse(res, msg) {
    const data = {
      status: 1,
      message: msg,
    };
    return res.status(200).json(data);
  }

  function successResponseWithData(res, msg, data) {
    const resData = {
      status: 1,
      message: msg,
      data: data,
    };
    return res.status(200).json(resData);
  }

  function errorResponse(res, msg) {
    const data = {
      status: 0,
      message: msg,
    };
    return res.status(500).json(data);
  }

  function notFoundResponse(res, msg) {
    const data = {
      status: 0,
      message: msg,
    };
    return res.status(404).json(data);
  }

  function validationErrorWithData(res, msg, data) {
    const resData = {
      status: 0,
      message: msg,
      data: data,
    };
    return res.status(400).json(resData);
  }

  function unauthorizedResponse(res, msg) {
    const data = {
      status: 0,
      message: msg,
    };
    return res.status(401).json(data);
  }

  return {
    successResponse,
    successResponseWithData,
    errorResponse,
    notFoundResponse,
    validationErrorWithData,
    unauthorizedResponse,
  };
}
