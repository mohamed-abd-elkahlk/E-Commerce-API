//? mergeParams allow us to acess prameter from other routes
const router = require("express").Router({ mergeParams: true });

// SubCategorey services
const {
  createSubCategorey,
  getSubCategorey,
  getSubCategoreyById,
  updateSubCategoreyById,
  deleteSubCategoreyById,
  setCategoryIdToBody,
  FilterObject,
} = require("../services/SubCategorey.service");

// SubCategorey validators

const {
  getCatogeryValidator,
  createCatogeryValidator,
  deleteCatogeryValidator,
  updateCatogeryValidator,
} = require("../utils/validation/SubCategorey.vaildator");

router
  .route("/")
  .post(setCategoryIdToBody, createCatogeryValidator, createSubCategorey)
  .get(FilterObject, getSubCategorey);
router
  .route("/:id")
  .get(getCatogeryValidator, getSubCategoreyById)
  .put(updateCatogeryValidator, updateSubCategoreyById)
  .delete(deleteCatogeryValidator, deleteSubCategoreyById);

module.exports = router;
