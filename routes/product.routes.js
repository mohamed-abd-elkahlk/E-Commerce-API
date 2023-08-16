const router = require("express").Router();

// categorey services
const {
  createProduct,
  deleteProductById,
  getProduct,
  getProductById,
  updateProductById,
  resizeProductImages,
  uploadProductImages,
} = require("../services/product.service");
const reviewsRoute = require("./reviews.routes");
// categorey validators

const {
  createProductValidator,
  deleteProductValidator,
  getProductValidator,
  updateProductValidator,
} = require("../utils/validation/product.validator");

// POST   /products/jkshjhsdjh2332n/reviews
// GET    /products/jkshjhsdjh2332n/reviews
// GET    /products/jkshjhsdjh2332n/reviews/87487sfww3
router.use("/:productId/reviews", reviewsRoute);

router
  .route("/")
  .post(
    resizeProductImages,
    uploadProductImages,
    createProductValidator,
    createProduct
  )
  .get(getProduct);
router
  .route("/:id")
  .get(getProductValidator, getProductById)
  .put(
    resizeProductImages,
    uploadProductImages,
    updateProductValidator,
    updateProductById
  )
  .delete(deleteProductValidator, deleteProductById);

module.exports = router;
