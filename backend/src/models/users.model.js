const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [{ type: Object }],

  devices: [{ type: Object }],
});

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  }
});

userSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error("Password is missing, can not compare! ");

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log("Error comparing password! " + error.message);
  }
};

userSchema.statics.isThisEmailInUse = async function (email) {
  if (!email) throw new Error("Please provide an email address");
  try {
    const user = await this.findOne({ email });
    if (!user) return true;
    return false;
  } catch (error) {
    console.log("error inside isThisEmailInUse : ", error.message);
    return false;
  }
};

module.exports = model("User", userSchema);
