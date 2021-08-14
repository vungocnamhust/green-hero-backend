const userService = require("../services/user");
const { ROLES } = require("../utils/constants");
const fs = require("fs");

const getUser = async (req, res) => {
  const role = req.user.role;
  const { userName, password } = req.body;
  const user = await userService.getUser({
    userName,
    password,
    role,
  });
  return res.send({ status: 200, result: user });
};

const updateUser = async (req, res, next) => {
  let avatarImg;
  if (req.file) {
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString("base64");
    // Define a JSONobject for the image attributes for saving to database
  
    avatarImg = {
      contentType: req.file.mimetype,
      image: Buffer.from(encode_image, "base64"),
    };
  }
  
  const role = req.user.role;
  const userName = req.user.userName;
  const { fullName, firstName, phone, email, sex, birthday, address } = req.body;

  let userData = {};
  if (fullName) userData.fullName = fullName;
  if (firstName) userData.firstName = firstName;
  if (avatarImg) userData.avatarImg = avatarImg;
  if (phone) userData.phone = phone;
  if (email) userData.email = email;
  if (sex) userData.sex = sex;
  if (birthday) userData.birthday = birthday;
  if (address) userData.address = address;

  const user = await userService.updateUser({
    userName,
    userData,
    role,
  });
  return res.send({ status: 200, result: user });
};

const updateUserBankAccount = async (req, res, next) => {
  const role = req.user.role;
  const userName = req.user.userName;
  const { bankAccountNumber, bankAccountBalance } = req.body;

  let userData = {};
  if (bankAccountNumber) userData.bankAccountNumber = bankAccountNumber;
  if (bankAccountBalance || bankAccountBalance == 0) userData.bankAccountBalance = bankAccountBalance;
  const user = await userService.updateUser({
    userName,
    userData,
    role,
  });
  return res.send({ status: 200, result: user });
};

module.exports = {
  getUser,
  updateUser,
  updateUserBankAccount,
};
