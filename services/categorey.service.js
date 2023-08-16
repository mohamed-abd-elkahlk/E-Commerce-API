/* eslint-disable import/no-extraneous-dependencies */

const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const expressAsyncHandler = require("express-async-handler");
const { uploadSingleImage } = require("../middleware/uploadImages");
const Catogrey = require("../modules/categorey");
const factory = require("./handler.service");
// Upload single image
exports.uploadCategoryImage = uploadSingleImage("image");

// Image processing
exports.resizeImage = expressAsyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`uploads/categories/${filename}`);

  // Save image into our db
  req.body.image = filename;

  next();
});
// @desc   Create category
// @route  POST /api/category
// @access Privte or (admin/manger)
exports.createCategory = factory.createOne(Catogrey);

// @desc   get category
// @route  GET /api/category
// @access public
exports.getCategory = factory.getAll(Catogrey);

// @desc   get category by id
// @route  GET /api/category/:id
// @access public

exports.getCategoreyById = factory.getOneById(Catogrey);

// @desc   updata category by id
// @route  PUT /api/category/:id
// @access Privte

exports.updateCategoreyById = factory.updataOne(Catogrey);
// @desc   delete category by id
// @route  DELETE /api/category/:id
// @access Privte

exports.deleteCategoreyById = factory.deletOne(Catogrey);
