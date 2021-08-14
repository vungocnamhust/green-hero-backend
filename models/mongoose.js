const mongoose = require("mongoose");
require("dotenv").config();

const { MONGO_USER, MONGO_PASSWORD } = process.env;
const MONGO_URI = `mongodb+srv://greenhero:${MONGO_PASSWORD}@master.jpmb5.mongodb.net/${MONGO_USER}?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI, {
  autoIndex: false,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error.');
  console.error(err);
  process.exit();
});

mongoose.connection.once('open', () => {
  console.log(`Connected to MongoDB: ${MONGO_URI}`);
});

module.exports = mongoose;

