const { check } = require("express-validator");
const slugify = require("slugify");
const validatorMiddlewer = require("../../middleware/validation");

// create vaildator for get Brand
exports.getBrandValidator = [
  check("id").isMongoId().withMessage("invaild Brand id "),
  validatorMiddlewer,
];

// create vaildator for create Brand
exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("hi")
    .isLength({ max: 30, min: 3 })
    .withMessage(
      "Brand must be at least 3 characters and t most 30 characters !"
    )
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddlewer,
];

// create vaildator for deletes Brand
exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("invaild Brand id "),
  validatorMiddlewer,
];

// create vaildator for update Brand
exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("invaild Brand id "),
  check("name")
    .notEmpty()
    .withMessage("name reqired")
    .isLength({ max: 30, min: 3 })
    .withMessage(
      "Brand must be at least 3 characters and t most 30 characters!"
    )
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddlewer,
];
