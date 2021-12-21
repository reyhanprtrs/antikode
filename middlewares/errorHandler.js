module.exports = (err, req, res, next) => {
  const errorObject = (code, message) => {
    return res.status(code).json({
      status: "Error",
      name: err.name,
      message: message,
    });
  };

  switch (err.name) {
    case "IncompleteProperty":
      errorObject(400, "Incomplete property");
      break;
    case "EmptyString":
      errorObject(400, `Can't be filled with empty string`);
      break;
    case "FillInTheBlank":
      errorObject(400, "Please fill in the blank");
      break;
    case "IncludeID":
      errorObject(400, "ID is required");
      break;
    case "RequiredBrandID":
      errorObject(400, "Brand ID is required");
      break;
    case "CantFetchData":
      errorObject(400, "Please include the limit and offset for fetching data");
      break;
    case "BrandIsNotExist":
      errorObject(404, "Brand is not exist");
      break;
    case "ErrorNotFound":
      errorObject(404, "Error not found");
      break;
    default:
      res.status(500).json({
        status: "Error",
        name: "InternalServerError",
        message: "Internal server error",
      });
  }
};