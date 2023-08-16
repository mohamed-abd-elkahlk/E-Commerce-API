const { model, Schema } = require("mongoose");

const CategoryeShema = new Schema(
  {
    name: {
      type: String,
      required: [true, "categorey required"],
      unique: [true, "categorey alredy exisst"],
      minlength: [3, "categorey must be at least 3 characters"],
      maxlength: [30, "categorey must be at most 30characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
const setImageURL = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imageUrl;
  }
};
// findOne, findAll and update
CategoryeShema.post("init", (doc) => {
  setImageURL(doc);
});

// create
CategoryeShema.post("save", (doc) => {
  setImageURL(doc);
});
const Cateogery = model("category", CategoryeShema);

module.exports = Cateogery;
