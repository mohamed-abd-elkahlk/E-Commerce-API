const router = require("express").Router();

// categorey services
const {
  createCategory,
  getCategory,
  getCategoreyById,
  updateCategoreyById,
  deleteCategoreyById,
  uploadCategoryImage,
  resizeImage,
} = require("../services/categorey.service");

// categorey validators

const {
  getCatogeryValidator,
  createCatogeryValidator,
  deleteCatogeryValidator,
  updateCatogeryValidator,
} = require("../utils/validation/categorey.vaildator");

const subcategoryRoute = require("./subCategory.routes");

router.use("/:categoryid/subcategories", subcategoryRoute);

router
  .route("/")
  .post(
    uploadCategoryImage,
    resizeImage,
    createCatogeryValidator,
    createCategory
  )
  .get(getCategory);
router
  .route("/:id")
  .get(getCatogeryValidator, getCategoreyById)
  .put(
    uploadCategoryImage,
    resizeImage,
    updateCatogeryValidator,
    updateCategoreyById
  )
  .delete(deleteCatogeryValidator, deleteCategoreyById);

module.exports = router;
