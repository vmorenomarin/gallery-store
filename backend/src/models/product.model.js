const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    nameImg: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    rate: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);

productSchema.methods.setImgUrl = function (filename) {
  const url = "http://localhost:4000/";
  this.img = url + "public/imgs/" + filename;
  this.nameImg = filename;
};

module.exports = model("products", productSchema);
