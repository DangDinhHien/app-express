// Setup reuses function
module.exports = {
  multipleMongooseToObject: (mongooseArr) =>
    mongooseArr.map((mongoose) => mongoose.toObject()),
  mongooseToObject: (mongoose) => (mongoose ? mongoose.toObject() : mongoose),
};
