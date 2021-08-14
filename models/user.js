var mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { addressSchema } = require("../models/address");
const { ROLES, SEX } = require("../utils/constants");
const userSchema = new mongoose.Schema(
  {
    _id: Number,
    fullName: String,
    phone: String,
    email: String,
    birthday: Date,
    sex: {
      type: String,
      enum: [SEX.MALE, SEX.FEMALE],
    },
    role: {
      type: String,
      enum: [ROLES.ADMIN, ROLES.USER, ROLES.DEV, ROLES.ANONYMOUS],
    },
    address: addressSchema,
  },
  {
    timestamps: true,
    versionKey: false,
    _id: false,
  }
);

userSchema.plugin(AutoIncrement, { id: "user_seq" });

module.exports = mongoose.model("User", userSchema);
