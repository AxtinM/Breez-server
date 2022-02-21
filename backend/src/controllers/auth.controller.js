const User = require("../models/users.model");
const jwt = require("jsonwebtoken");

exports.signUpController = async (req, res) => {
  const isNewUser = await User.isThisEmailInUse(req.body.email);
  if (!isNewUser) {
    return res.send({
      success: false,
      message: "this email is already in use try sign-in.",
    });
  }
  try {
    const user = await User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    user.save();
    return res.send({
      success: true,
      message: `Created User with email ${user.email} successfully`,
    });
  } catch (error) {
    console.log("Error while Creating User : ", error.message);
    return res.send({
      success: false,
      message: `Error while creating User : ${error.message}`,
    });
  }
};

exports.signInController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.send({
      success: false,
      message: "user not found with the given email",
    });
  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.send({
      success: false,
      message: "Email and/or Password must be Correct!",
    });

  let oldTokens = user.tokens || [];

  if (oldTokens.length) {
    oldTokens = oldTokens.filter((token) => {
      const timeDiff = Date.now() - parseInt(token.signedAt) / 1000;
      if (timeDiff < 86400) {
        return token;
      }
    });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  await User.findByIdAndUpdate(user._id, {
    tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
  });
  res.send({
    success: true,
    message: "Logged in successfully",
    jwt: token,
  });
};

exports.signOutController = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization fail!" });
    }

    const tokens = req.user.tokens;

    const newTokens = tokens.filter((t) => t.token !== token);

    await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    res.json({ success: true, message: "Sign out successfully!" });
  }
};
