const { check } = require("express-validator");
const { default: slugify } = require("slugify");
const validatorMiddlwere = require("../../middleware/validation");

const Category = require("../../modules/categorey");

const SubCategory = require("../../modules/subCategory");

exports.createProductValidator = [
  check("title")
    .isLength({ min: 3 })
    .withMessage("too short")
    .notEmpty()
    .withMessage("title required!")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("description")
    .isLength({ max: 2000 })
    .withMessage("too long descrption"),
  check("quantity")
    .notEmpty()
    .withMessage("product quantity is required")
    .isNumeric()
    .withMessage("product quanttiy must be a number")
    .isLength({ max: 32 })
    .withMessage("to long price"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("price After Discount must be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("price after discount must be lower than price");
      }
      return true;
    }),
  check("colors").optional().isArray().withMessage("colors must be an array "),
  check("imageCover").notEmpty().withMessage("imagesCover reqired!"),
  check("image")
    .optional()
    .isArray()
    .withMessage("image should be array of strings"),
  check("category")
    .notEmpty()
    .withMessage("category reqired")
    .isMongoId()
    .withMessage("invalid category id format")
    .custom((value) =>
      Category.findById(value).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`no category for this is id: ${value} `)
          );
        }
      })
    ),
  check("brand")
    .optional()
    .isMongoId()
    .withMessage("invalid id fromat for brand"),
  check("subcategory")
    .optional()
    .isMongoId()
    .withMessage("invalid id fromat for subcategory")
    // eslint-disable-next-line arrow-body-style
    .custom((value) => {
      return SubCategory.find({ _id: { $exists: true, $in: value } }).then(
        (results) => {
          if (results.length < 1 || results.length !== value.length) {
            return Promise.reject(
              new Error(
                `no subcategory id founded in database match your qurey `
              )
            );
          }
        }
      );
    })
    .custom((val, { req }) =>
      SubCategory.find({ category: req.body.category }).then((result) => {
        const subCategoryIds = [];
        result.forEach((subCategory) => {
          subCategoryIds.push(subCategory._id.toString());
        });
        // TODO nead to learn more about the next line
        const checker = val.every((v) => subCategoryIds.includes(v));
        if (!checker) {
          return Promise.reject(
            new Error(
              `no subcategory in  founded in database match your category  `
            )
          );
        }
      })
    ),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("ratingsAverage must be a number")
    .isLength({ min: 1, max: 5 })
    .withMessage("rating range must be  betwen 1 to 5"),
  check("ratingsQuantity").optional().isNumeric(),
  validatorMiddlwere,
];

exports.getProductValidator = [check("id").isMongoId(), validatorMiddlwere];

exports.updateProductValidator = [
  check("id").isMongoId(),
  check("title")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddlwere,
];

exports.deleteProductValidator = [check("id").isMongoId(), validatorMiddlwere];
