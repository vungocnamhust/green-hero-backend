var mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    name: String,
    number: String,
    street: String,
    district: String,
    province: String,
    ward: String,
    latitude: Number,
    longitude: Number,
  },
);

const Address = mongoose.model("Address", addressSchema);
module.exports = {
  Address,
  addressSchema,
};
