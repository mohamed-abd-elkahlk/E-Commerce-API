const router = require("express").Router();

// categorey services
const {
  createBrand,
  getBrand,
  getBrandById,
  updateBrandById,
  deleteBrandById,
  uploadBrandImage,
  resizeImage,
} = require("../services/brand.service");

// categorey validators

const {
  createBrandValidator,
  deleteBrandValidator,
  getBrandValidator,
  updateBrandValidator,
} = require("../utils/validation/brand.vaildator");

router
  .route("/")
  .post(uploadBrandImage, resizeImage, createBrandValidator, createBrand)
  .get(getBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrandById)
  .put(uploadBrandImage, resizeImage, updateBrandValidator, updateBrandById)
  .delete(deleteBrandValidator, deleteBrandById);

module.exports = router;
