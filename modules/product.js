const { model, Schema } = require("mongoose");

const productShema = new Schema(
  {
    title: {
      type: String,
      required: [true],
      trim: true,
      minlenght: [3, "too short product titlle"],
      maxlenght: [100, "too short product titlle"],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "product descriptipn reqired"],
      minlenght: [50, "too short product descriptipn"],
    },
    quantity: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "product price reqired"],
      max: [200000, "too long product price"],
    },
    priceAfterDiscount: {
      type: Number,
      default: 0,
    },
    colors: [String],
    imageCover: {
      type: String,
      required: [true, "image cover reqired !"],
    },
    images: [String],
    category: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "category",
    },
    subcategory: [
      {
        type: Schema.Types.ObjectId,
        ref: "subCategory",
      },
    ],
    brand: {
      type: Schema.Types.ObjectId,
      ref: "brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "rating must be above or equal 1.0"],
      max: [5, "rating must be bleow or equal 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    //     // TODO: add relationship to user or salier !
    //     // TODO: make model for comments !
  },
  {
    timestamps: true,
    // to enable virtual populate
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productShema.virtual("reviews", {
  ref: "Review",
  localField: "product",
  foreignField: "_id",
});

productShema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name -_id",
  });
  next();
});

const setImageURL = (doc) => {
  if (doc.imageCover) {
    const imageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
    doc.imageCover = imageUrl;
  }
  if (doc.images) {
    const imagesList = [];
    doc.images.forEach((image) => {
      const imageUrl = `${process.env.BASE_URL}/products/${image}`;
      imagesList.push(imageUrl);
    });
    doc.images = imagesList;
  }
};
// findOne, findAll and update
productShema.post("init", (doc) => {
  setImageURL(doc);
});

const Product = model("product", productShema);

module.exports = Product;
