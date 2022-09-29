const catchAsyncError = require("../Middleware/catchAsyncError");
const User = require("../Models/userModel");
const ErrorHandler = require("../Utils/errorHandle");
const sendToken = require("../Utils/jwtToken");
const sendEmail = require("../Utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const { firstName, lastName, email, password } = req.body;

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  return res
    .status(201)
    .json({ success: true, message: "Account Created Successfully" });
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Your password and email", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  //   const token = user.getJWTToken();
  //   res.status(201).json({ success: true, user, token });

  sendToken(user, 200, res);
});

exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not Found", 404));
  }
  //get pass token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is: - \n \n ${resetPasswordUrl} \n \n If you not requested this email then please ignore it`;
  try {
    await sendEmail({
      email: user.email,
      subject: `E-commerce Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await next(new ErrorHandler(`${err.message}`, 500));
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  //create token has
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset password token is invalid or expired", 400)
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Required new Password", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

//update password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is correct", 401));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

//update profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };
  // if (req.body.avatar !== "") {
  //   const user = await User.findById(req.user.id);
  //   const imageId = user.avatar.public_id;
  //   await cloudinary.v2.uploader.destroy(imageId);
  //   const myCloud = await cloudinary.v2.uploader.update(req.body.avatar, {
  //     folder: "avatar",
  //     width: 150,
  //     crop: "scale",
  //   });

  //   newUserData.avatar = {
  //     public_id: myCloud.public_id,
  //     url: myCloud.secure_url,
  //   };
  // }
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true });
});

//get all users (admin)
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ success: true, users });
});
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`user does not exist with Id:${req.params.id}`)
    );
  }
  res.status(200).json({ success: true, user });
});

//update profile role --admin
exports.updateUserRoles = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true });
});

//delete user
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with ID: ${req.params.id}`)
    );
  }
  const imageId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);
  await user.remove();

  res.status(200).json({ success: true });
});
