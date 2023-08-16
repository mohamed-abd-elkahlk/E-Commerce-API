class ApiFeatures {
  constructor(mongooseQuery, quryString) {
    this.mongooseQuery = mongooseQuery;
    this.quryString = quryString;
  }
  // TODO: refactor our api

  filter() {
    // filteraing ->
    const quryObj = { ...this.quryString };
    const exclueds = ["page", "sort", "fildes", "limit", "q"];
    exclueds.forEach((fild) => delete quryObj[fild]);
    console.log(quryObj);
    const quryStr = JSON.stringify(quryObj).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(quryStr));

    return this;
  }

  pagenate(countDocuments) {
    // pagination ->
    const page = this.quryString.page * 1 || 1;
    const limit = this.quryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const pages = Math.ceil(countDocuments / limit);
    const pagenation = { currenPage: page, limit, pages };

    // next page
    const endIndex = page * limit;
    if (endIndex < countDocuments) {
      pagenation.next = page + 1;
    }

    // previas page
    if (skip > 0) {
      pagenation.prev = page - 1;
    }
    this.pagenation = pagenation;
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    return this;
  }

  sort() {
    if (this.quryString.sort) {
      const sorting = this.quryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sorting);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("createAt");
    }
    return this;
  }

  limitFildes() {
    // selct ->
    if (this.quryString.fildes) {
      const fild = this.quryString.fildes.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fild);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  serch() {
    // serching
    if (this.quryString.q) {
      const qury = {};
      qury.$or = [
        { title: { $regex: this.quryString.q, $options: "i" } },
        { description: { $regex: this.quryString.q, $options: "i" } },
        { name: { $regex: this.quryString.q, $options: "i" } },
      ];
      this.mongooseQuery = this.mongooseQuery.find(qury);
    }
    return this;
  }
}

module.exports = ApiFeatures;
