/* eslint-disable import/no-extraneous-dependencies */
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const { uploadSingleImage } = require("../middleware/uploadImages");
const factory = require("./handler.service");
const Brand = require("../modules/brand");

exports.uploadBrandImage = uploadSingleImage("image");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const fileName = `brand-${uuidv4() - Date.now()}.jpeg`;
  console.log(req.files);
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`upldes/brads/${fileName}`);

  req.body.image = fileName;
  next();
});
// @desc   Create Brand
// @route  POST /api/Brand
// @access Privte or (admin/manger)
exports.createBrand = factory.createOne(Brand);

// @desc   get Brand
// @route  GET /api/Brand
// @access public
exports.getBrand = factory.getAll(Brand);

// @desc   get Brand by id
// @route  GET /api/Brand/:id
// @access public

exports.getBrandById = factory.getOneById(Brand);

// @desc   updata Brand by id
// @route  PUT /api/Brand/:id
// @access Privte

exports.updateBrandById = factory.updataOne(Brand);

// @desc   delete Brand by id
// @route  DELETE /api/Brand/:id
// @access Privte

exports.deleteBrandById = factory.deletOne(Brand);
