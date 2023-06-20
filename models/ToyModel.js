var mongoose = require('mongoose');

var MovieSchema = mongoose.Schema(
   {
      name : String,
      brand : String,
      category : String,
      price : Number,
      quantity : Number,
      picture: String,
      describe: String
   }
);

var MovieModel = mongoose.model("Phim", MovieSchema, "Lan");
module.exports = MovieModel;