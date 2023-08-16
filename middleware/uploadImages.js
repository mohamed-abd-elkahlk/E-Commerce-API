// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require("multer");
const ApiError = require("../utils/ApiError.util");

const multerOptions = () => {
  const multerStorge = multer.memoryStorage();

  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("onley image alllowed", 400));
    }
  };
  const upload = multer({ storage: multerStorge, fileFilter: multerFilter });
  return upload;
};

exports.uploadSingleImage = (fildName) => multerOptions().single(fildName);
exports.uploadMixOfImages = (arrayOfFildes) =>
  multerOptions().fields(arrayOfFildes);
//
