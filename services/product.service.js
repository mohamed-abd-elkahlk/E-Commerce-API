/* eslint-disable import/no-extraneous-dependencies */
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const expressAsyncHandler = require("express-async-handler");
const { uploadMixOfImages } = require("../middleware/uploadImages");
const Product = require("../modules/product");
const factory = require("./handler.service");

exports.uploadProductImages = uploadMixOfImages([
  {
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 5,
  },
]);

exports.resizeProductImages = expressAsyncHandler(async (req, res, next) => {
  // console.log(req.files);
  //1- Image processing for imageCover
  if (req.files.imageCover) {
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;

    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/products/${imageCoverFileName}`);

    // Save image into our db
    req.body.imageCover = imageCoverFileName;
  }
  //2- Image processing for images
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 95 })
          .toFile(`uploads/products/${imageName}`);

        // Save image into our db
        req.body.images.push(imageName);
      })
    );

    next();
  }
});
// @desc   Create Product
// @route  POST /api/Product
// @access Privte or (admin/manger)
exports.createProduct = factory.createOne(Product);

// @desc   get Product
// @route  GET /api/Product
// @access public
exports.getProduct = factory.getAll(Product);

// @desc   get Product by id
// @route  GET /api/Product/:id
// @access public

exports.getProductById = factory.getOneById(Product, "reviews");

// @desc   updata Product by id
// @route  PUT /api/Product/:id
// @access Privte

exports.updateProductById = factory.updataOne(Product);

// @desc   delete Product by id
// @route  DELETE /api/Product/:id
// @access Privte

exports.deleteProductById = factory.deletOne(Product);
