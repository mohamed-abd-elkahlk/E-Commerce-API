const SubCategory = require("../modules/subCategory");
const factory = require("./handler.service");

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryid;
  next();
};

// @desc   Create SubCategorey
// @route  POST /api/SubCategorey
// @access Privte or (admin/manger)
exports.createSubCategorey = factory.createOne(SubCategory);

// @desc   get SubCategorey
// @route  GET /api/SubCategorey
// @access public

exports.FilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryid) {
    filterObject = { category: req.params.categoryid };
  }
  req.filterObject = filterObject;
  next();
};

// /////////////////////////////////////////////////////
exports.getSubCategorey = factory.getAll(SubCategory);
// @desc   get SubCategorey by id
// @route  GET /api/SubCategorey/:id
// @access public

exports.getSubCategoreyById = factory.getOneById(SubCategory);

// @desc   updata SubCategorey by id
// @route  PUT /api/SubCategorey/:id
// @access Privte

exports.updateSubCategoreyById = factory.updataOne(SubCategory);
// @desc   delete SubCategorey by id
// @route  DELETE /api/SubCategorey/:id
// @access Privte

exports.deleteSubCategoreyById = factory.deletOne(SubCategory);
