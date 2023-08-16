const { default: slugify } = require("slugify");
const { check } = require("express-validator");
const validatorMiddlewer = require("../../middleware/validation");

// create vaildator for get catogery
exports.getCatogeryValidator = [
  check("id").isMongoId().withMessage("invaild subcategory id "),
  validatorMiddlewer,
];

// create vaildator for create catogery
exports.createCatogeryValidator = [
  check("name")
    .notEmpty()
    .withMessage("category field requird")
    .isLength({ max: 30, min: 2 })
    .withMessage(
      "categorey must be at least 2  characters and t most 30 characters !"
    )
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("category")
    .notEmpty()
    .withMessage("category field requird")
    .isMongoId()
    .withMessage("invaild category id "),
  validatorMiddlewer,
];

// create vaildator for deletes catogery
exports.deleteCatogeryValidator = [
  check("id").isMongoId().withMessage("invaild subcategory id "),
  validatorMiddlewer,
];

// create vaildator for update catogery
exports.updateCatogeryValidator = [
  check("id").isMongoId().withMessage("invaild subcategory id "),
  check("name")
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
  // TODO: cheak the category id vailde or not if it provided
  // check("category").isMongoId().withMessage("invaild category id "),
  validatorMiddlewer,
];
