const { model, Schema, default: mongoose } = require("mongoose");

const SubCategoryShema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "subCateogery required"],
      unique: [true, "subCateogery alredy exisst"],
      minlength: [2, "subCateogery must be at least 2 characters"],
      maxlength: [30, "subCateogery must be at most 30characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
    category: {
      type: mongoose.Schema.ObjectId,
      required: [true, "subCateogery must be belong to category"],
      ref: "category",
    },
  },
  { timestamps: true }
);
const setImageURL = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/subCategory/${doc.image}`;
    doc.image = imageUrl;
  }
};
// findOne, findAll and update
SubCategoryShema.post("init", (doc) => {
  setImageURL(doc);
});

// create
SubCategoryShema.post("save", (doc) => {
  setImageURL(doc);
});
const SubCategory = model("subCategory", SubCategoryShema);

module.exports = SubCategory;
