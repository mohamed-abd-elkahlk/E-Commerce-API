const { check, body } = require("express-validator");
const slugify = require("slugify");
const validatorMiddlewer = require("../../middleware/validation");

// create vaildator for get catogery
exports.getCatogeryValidator = [
  check("id").isMongoId().withMessage("invaild categorye id "),
  validatorMiddlewer,
];

// create vaildator for create catogery
exports.createCatogeryValidator = [
  check("name")
    .notEmpty()
    .withMessage("hi")
    .isLength({ max: 30, min: 3 })
    .withMessage(
      "categorey must be at least 3 characters and t most 30 characters !"
    )
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddlewer,
];

// create vaildator for deletes catogery
exports.deleteCatogeryValidator = [
  check("id").isMongoId().withMessage("invaild categorye id "),
  validatorMiddlewer,
];

// create vaildator for update catogery
exports.updateCatogeryValidator = [
  check("id").isMongoId().withMessage("invaild categorye id "),
  body("name")
    .notEmpty()
    .withMessage("name reqired")
    .isLength({ max: 30, min: 3 })
    .withMessage(
      "categorey must be at least 3 characters and t most 30 characters!"
    )
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddlewer,
];
