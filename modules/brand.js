const { model, Schema } = require("mongoose");

const BrandShema = new Schema(
  {
    name: {
      type: String,
      required: [true, "brand required"],
      unique: [true, "brand alredy exisst"],
      minlength: [2, "brand must be at least 3 characters"],
      maxlength: [30, "brand must be at most 30characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
const setImageUrl = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
    doc.image = imageUrl;
  }
};
// when crate new one
BrandShema.post("save", (doc) => {
  setImageUrl(doc);
});
// when i updaate
BrandShema.post("init", (doc) => {
  setImageUrl(doc);
});
const Brand = model("brand", BrandShema);

module.exports = Brand;
